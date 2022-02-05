/**
 * @swagger
 * /v1/example/find:
 *   get:
 *     summary: Returns OK message.
 *     tags: [Example]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK plain text
 *         schema:
 *           type: string
 */

import addAPITag from 'middleware/addAPITag'

const action = async (ctx) => {
  try {
    ctx.body = 'OK'
  } catch (err) {
    ctx.throw(err)
  }
}

export default {
  method: 'GET',
  route: '/find',
  handlers: [addAPITag, action],
}

export { action as __action }
