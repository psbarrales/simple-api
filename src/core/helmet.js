import helmet from 'koa-helmet'

function use() {
  console.debug('[core] requiring Helmet')
  return helmet({
    contentSecurityPolicy: false,
  })
}

export default {
  use,
}
