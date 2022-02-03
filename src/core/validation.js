import convert from 'koa-convert'
import validate from 'koa-validation'

function use() {
  console.debug('[core] requiring Validation')
  return convert(validate())
}

export default {
  use,
}
