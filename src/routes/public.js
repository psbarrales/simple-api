import path from 'path'
import Router from 'koa-router'
import send from 'koa-send'

export default async (api) => {
  const serveBase = path.join(process.cwd(), '/src/public')

  const staticRouter = new Router()
  staticRouter.get('/public/(.*)', async (ctx) =>
    send(ctx, ctx.path.replace('/public', ''), {
      root: serveBase,
      immutable: true,
    }),
  )

  staticRouter.get('/favicon.ico', async (ctx) =>
    send(ctx, ctx.path.replace('/public/favicon.ico', ''), {
      root: serveBase,
      immutable: true,
    }),
  )
  return api.use(staticRouter.routes())
}
