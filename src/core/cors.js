import cors from '@koa/cors'

function use() {
  console.debug('[core] requiring CORS')
  return cors()
}

export default {
  use,
}
