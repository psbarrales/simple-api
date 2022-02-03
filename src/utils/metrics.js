import client from 'prom-client'
const pkg = require('../../package.json')

const name = pkg.name.replace(/-/g, '_').replace(/\./g, '_')

global.metrics = global.metrics || {}
global.metrics.init = global.metrics.init || init()

function init() {
  return client.collectDefaultMetrics({
    prefix: `${process.env.PREFIX_METRICS || name}_`,
    timeout: 5000,
  })
}

function counter(opts, fn, ...args) {
  global.metrics.counter = global.metrics.counter || {}
  opts.name = `${process.env.PREFIX_METRICS || name}_${opts.name}`
  opts.help = opts.help || `Counter for ${opts.name}`
  global.metrics.counter[opts.name] =
    global.metrics.counter[opts.name] || new client.Counter(opts)

  global.metrics.counter[opts.name][fn](...args)
}

function gauge(opts, fn, ...args) {
  global.metrics.gauge = global.metrics.gauge || {}
  opts.name = `${process.env.PREFIX_METRICS || name}_${opts.name}`
  opts.help = opts.help || `Gauge for ${opts.name}`
  global.metrics.gauge[opts.name] =
    global.metrics.gauge[opts.name] || new client.Gauge(opts)

  global.metrics.gauge[opts.name][fn](...args)
}

function Histogram(opts, fn, ...args) {
  global.metrics.histogram = global.metrics.histogram || {}
  opts.name = `${process.env.PREFIX_METRICS || name}_${opts.name}`
  opts.help = opts.help || `Histogram for ${opts.name}`
  global.metrics.histogram[opts.name] =
    global.metrics.histogram[opts.name] || new client.Histogram(opts)

  global.metrics.histogram[opts.name][fn](...args)
}

export default {
  client,
  init,
  counter,
  gauge,
  Histogram,
}

export { client }
