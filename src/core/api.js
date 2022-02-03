/* eslint-disable node/no-path-concat */
import Koa from 'koa'
import glob from 'glob'
import query from 'koa-qs'

const api = async () => {
  const koa = new Koa()
  koa.on('error', (err) => {
    console.error(err)
  })
  await core(koa)
  await middleware(koa)
  query(koa)
  return koa
}

async function core(koa) {
  console.debug('[core] starting require module')
  const matches = await new Promise((resolve, reject) => {
    glob(
      `${__dirname}/*`,
      {
        ignore: [
          '**/index.js',
          '**/api.js',
          '**/*.ignore.js',
          '**/*.require.js',
        ],
      },
      (err, matches) => {
        if (err) reject(err)
        else resolve(matches)
      },
    )
  })
  return Promise.all(matches.map(async (match) => module(match, koa)))
}

async function middleware(koa) {
  console.debug('[middleware] starting require module')
  const matches = await new Promise((resolve, reject) => {
    glob(`${__dirname}/../middleware/**.require.js`, {}, (err, matches) => {
      if (err) reject(err)
      else resolve(matches)
    })
  })
  return Promise.all(matches.map(async (match) => module(match, koa)))
}

async function module(match, koa) {
  const r = require(match)
  if (r && r.default && r.default.use) {
    return await koa.use(await r.default.use(koa))
  }
  if (r && r.default && r.default.run) {
    return await r.default.run(koa)
  }
}

export default api

export { core as _core, middleware as _middleware, module as _module }
