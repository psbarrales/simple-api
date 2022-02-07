import fs from 'fs'
import path from 'path'
import glob from 'glob'
import Router from 'koa-router'

const SRC_PATH = `${process.cwd()}/src`
const ROUTES_PATH = '/routes'

async function run(koa) {
  console.debug('[core] routes: starting autodiscovery on routes/*')
  const router = new Router()
  createDirectoryRoutes(`${SRC_PATH}${ROUTES_PATH}`, router)
  koa.use(router.routes()).use(router.allowedMethods())
}

const createDirectoryRoutes = (directory, router) => {
  const matches = glob.sync(`${directory}/*`, {
    ignore: ['**/index.js', '**/*.ignore.js'],
  })
  matches.forEach((match) => {
    if (fs.lstatSync(match).isDirectory()) {
      const routerDir = new Router({
        prefix: `/${path.basename(match)}`,
      })
      createDirectoryRoutes(match, routerDir)
      return router.use(routerDir.routes()).use(routerDir.allowedMethods())
    } else {
      return createFileRoute(match, router)
    }
  })
}

const createFileRoute = (file, router) => {
  const fileName = path.basename(file, '.js')
  const defaultFile = require(`${file}`).default
  // Get configs from file
  const configs = []
  if (!Array.isArray(defaultFile)) {
    configs.push(defaultFile)
  } else {
    configs.push.apply(configs, defaultFile)
  }
  // On each config append route to new router
  configs.forEach(({ method = '', route = `/${fileName}`, handlers = [] }) => {
    if (!method || !route || handlers.length === 0) {
      throw new Error(
        `${file}: Bad router definition method, route and handlers must to be defined`,
      )
    }
    const lastHandler = handlers.pop()
    router[method.toLowerCase()](
      route,
      ...handlers,
      async (ctx) => await lastHandler(ctx),
    )
  })
}

export default {
  run,
}

export {
  createFileRoute as __createFileRoute,
  createDirectoryRoutes as __createDirectoryRoutes,
}
