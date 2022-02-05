import path from 'path'
import Router from 'koa-router'
import send from 'koa-send'

const getSendAction = (pathFiles = '') => {
  const serveBase = path.join(process.cwd(), '/src/public')
  return async (ctx) =>
    send(ctx, ctx.path.replace(`/public${pathFiles}`, ''), {
      root: serveBase,
      immutable: true,
    })
}

export default async (api) => {
  const staticRouter = new Router()
  staticRouter.get('/public/(.*)', getSendAction())

  staticRouter.get('/favicon.ico', getSendAction('/favicon.ico'))

  return api.use(staticRouter.routes())
}

export { getSendAction as __getSendAction }
