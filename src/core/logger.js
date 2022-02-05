import koaLogger from 'koa-logger'
import convert from 'koa-convert'
import metrics from 'utils/metrics'

function use() {
  console.debug('[core] requiring Koa Logger')
  return convert(
    koaLogger({
      transporter,
    }),
  )
}

const transporter = (str, args) => {
  if (!args[3] && !args[4]) {
    metrics.counter({ name: 'request_total' }, 'inc')
  }
  console.info(str, {
    method: args[1],
    url: args[2],
    status: args[3],
    time: args[4],
    size: args[5],
    environment: process.env.NODE_ENV,
    build: process.env.BUILD_NUMBER || 'development',
    region: process.env.REGION || 'local',
  })
}

export default {
  use,
}

export { transporter as __transporter }
