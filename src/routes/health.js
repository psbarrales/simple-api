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

const pkg = require('../../package.json')

const initialDate = Date.now()
const body = {
  name: pkg.name,
  version: pkg.version,
  environment: process.env.NODE_ENV || '!NODE_ENV',
  build: process.env.BUILD_NUMBER || 'development',
  date: new Date(initialDate),
}

const setResponseBody = (ctx, body) => {
  ctx.body = body
}

const healthAction = (body, initialDate) => async (ctx) => {
  body.uptime = (Date.now() - initialDate) / 1000
  setResponseBody(ctx, body)
}

const stringAction = (txt) => async (ctx) => setResponseBody(ctx, txt)

export default [
  {
    method: 'GET',
    route: '/',
    handlers: [healthAction(body, initialDate)],
  },
  {
    method: 'GET',
    route: '/health',
    handlers: [healthAction(body, initialDate)],
  },
  {
    method: 'GET',
    route: '/up',
    handlers: [stringAction('UP')],
  },
  {
    method: 'GET',
    route: '/ping',
    handlers: [stringAction('PONG')],
  },
]

export {
  setResponseBody as __setResponseBody,
  healthAction as __healthAction,
  stringAction as __stringAction,
}
