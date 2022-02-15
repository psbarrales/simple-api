/* eslint-disable node/no-path-concat */
import Koa from 'koa'
import queue from 'queue'
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
  const matches = glob.sync(`${__dirname}/*`, {
    ignore: ['**/index.js', '**/api.js', '**/*.ignore.js', '**/*.require.js'],
  })
  const q = queue({
    concurrency: 1,
  })
  matches.forEach((match) => q.push(async () => module(match, koa)))
  q.start()
  // return Promise.all(matches.map(async (match) => module(match, koa)))
}

async function middleware(koa) {
  console.debug('[middleware] starting require module')
  const matches = glob.sync(`${__dirname}/../middleware/**.onload.js`, {})
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

export { core as __core, middleware as __middleware, module as __module }
