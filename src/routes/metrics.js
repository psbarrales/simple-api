/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: Get metrics data for prometheus
 *     tags: [Status]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Metrics data for prometheus
 *         schema:
 *           type: object
 */

import { client } from 'utils/metrics'

const action = async (ctx) => {
  ctx.body = await client.register.metrics()
}

export default {
  method: 'GET',
  route: '/metrics',
  handlers: [action],
}

export { action as __action }
