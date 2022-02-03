import Router from 'koa-router'
import { client } from 'utils/metrics'

export default async (api) => {
  const router = new Router()
  router.get('/metrics', async (ctx) => {
    ctx.body = await client.register.metrics()
  })

  return api.use(router.routes())
}
