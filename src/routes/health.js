/**
 * @swagger
 * /health:
 *   get:
 *     summary: Get health status
 *     tags: [Status]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: API Health status
 *         schema:
 *           type: object
 */

import Router from 'koa-router'
const pkg = require('../../package.json')

const setResponseBody = (ctx, body) => {
  return (ctx.body = body)
}

export default async (api) => {
  const initialDate = Date.now()
  const router = new Router()
  const body = {
    name: pkg.name,
    version: pkg.version,
    environment: process.env.NODE_ENV || '!NODE_ENV',
    build: process.env.BUILD_NUMBER || 'development',
    date: new Date(initialDate),
  }
  router.get('/health', async (ctx) => {
    body.uptime = (Date.now() - initialDate) / 1000
    setResponseBody(ctx, body)
  })

  router.get('/', async (ctx) => {
    body.uptime = (Date.now() - initialDate) / 1000
    setResponseBody(ctx, body)
  })

  router.get('/up', async (ctx) => {
    setResponseBody(ctx, 'UP')
  })
  router.get('/ping', async (ctx) => {
    setResponseBody(ctx, 'PONG')
  })

  return api.use(router.routes())
}

export { setResponseBody as __setResponseBody }
