import http from 'http'

function use() {
  console.debug('[core] requiring Error')
  return async (ctx, next) => {
    try {
      await next()
      if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404)
    } catch (err) {
      ctx.status = typeof err.status === 'number' ? err.status : 500
      // application
      ctx.app.emit('error', err, ctx)
      switch (ctx.accepts(['json', 'html'])) {
        case 'json':
          ctx.type = 'application/json'
          if (process.env.NODE_ENV !== 'production') {
            ctx.body = {
              error: err.message,
              stack: err.stack,
              originalError: err,
            }
          } else if (err.expose) {
            ctx.body = { error: err.message, originalError: err }
          } else ctx.body = { error: http.STATUS_CODES[ctx.status] }
          break
        case 'html':
        default:
          ctx.type = 'text/html'
          await ctx.render('error.njk', {
            originalError: err,
            env: process.env.NODE_ENV,
            ctx: ctx,
            request: ctx.request,
            response: ctx.response,
            error: err.message || http.STATUS_CODES[ctx.status],
            stack: err.stack,
            status: ctx.status,
            code: err.code,
          })
          break
      }
    }
  }
}

export default { use }
