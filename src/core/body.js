import body from 'koa-body'

function use() {
  console.debug('[core] requiring Body')
  return body({
    multipart: true,
  })
}

export default {
  use,
}
