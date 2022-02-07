import path from 'path'
import send from 'koa-send'

const getSendAction = (pathFiles = '') => {
  const serveBase = path.join(process.cwd(), '/src/public')
  return async (ctx) =>
    send(ctx, ctx.path.replace(`/public${pathFiles}`, ''), {
      root: serveBase,
      immutable: true,
    })
}

export default [
  {
    method: 'GET',
    route: '/public/(.*)',
    handlers: [getSendAction()],
  },
  {
    method: 'GET',
    route: '/favicon.ico',
    handlers: [getSendAction('/favicon.ico')],
  },
]

export { getSendAction as __getSendAction }
