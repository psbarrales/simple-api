/* eslint-disable node/no-path-concat */
import fs from 'fs'
import glob from 'glob'
import Router from 'koa-router'
import { flatten, orderBy } from 'lodash'

const initModules = (api, versionPath, parent) => {
  const versionName = `${parent ? `${parent}/` : ''}${versionPath
    .split('/')
    .pop()}`
  // VERSION NAME PATH ROUTE
  const versionRouter = new Router({
    prefix: `/${versionName}`,
  })

  if (versionName.indexOf('.js') <= 0) {
    glob(
      `${versionPath}/*`,
      {
        ignore: ['**/index.js', '**/*.ignore.js'],
      },
      (err, matches) => {
        if (err) {
          throw err
        }

        let routes = []
        const pathRouter = new Router({})

        matches.forEach((mod) => {
          try {
            if (fs.existsSync(mod)) {
              let router
              if (mod.indexOf('.js') >= 0 && mod.indexOf('.ignore.js') < 0) {
                router = require(`${mod}`)
                // pathRouter = new Router({})
              } else {
                // Going deeper
                return initModules(api, mod, versionName)
              }

              if (
                router.default &&
                router.default.route &&
                typeof router.default.route === 'function'
              ) {
                routes = routes.concat(flatten(router.default.route(api)))
              } else if (
                router.default &&
                typeof router.default.length === 'undefined'
              ) {
                routes = routes.concat([router.default])
              } else {
                routes = routes.concat(flatten(router.default))
              }
            }
          } catch (err) {
            console.error('[routes] ', {
              message: err.message,
            })
          }
        })
        routes = orderBy(routes, ['route'], ['desc'])
        routes.forEach((config) => {
          if (config && config.route) {
            // ACTION NAME ROUTE
            const instance = new Router()
            if (config) {
              const { method = '', route = '', handlers = [] } = config

              const lastHandler = handlers.pop()
              instance[method.toLowerCase()](
                route,
                ...handlers,
                async (ctx) => await lastHandler(ctx),
              )
            }
            pathRouter.use(instance.routes()).use(instance.allowedMethods())
          }
        })

        versionRouter.use(pathRouter.routes()).use(pathRouter.allowedMethods())

        api.use(versionRouter.routes()).use(versionRouter.allowedMethods())
      },
    )
  } else {
    const router = require(`${versionPath}`)
    if (typeof router.default === 'function') {
      router.default(api)
    }
  }
}

async function run(api) {
  console.debug('[routes] starting autodiscovery definitions')
  return new Promise((resolve, reject) => {
    glob(
      `${__dirname}/../routes/*`,
      {
        ignore: ['**/index.js', '**/*.ignore.js'],
      },
      (err, matches) => {
        if (err) {
          reject(err)
          throw err
        }
        matches.forEach((versionPath) => initModules(api, versionPath))
        resolve(matches)
      },
    )
  })
}

export default {
  run,
}
