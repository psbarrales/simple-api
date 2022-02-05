import metrics from 'utils/metrics'
import client from 'prom-client'

jest.mock('prom-client')

test('metrics: Should be defined', () => {
  expect(metrics).toBeDefined()
  expect(metrics.init).toBeDefined()
  expect(metrics.client).toBeDefined()
  expect(metrics.counter).toBeDefined()
  expect(metrics.gauge).toBeDefined()
  expect(metrics.Histogram).toBeDefined()
})

test('metrics: init should call client.collectDefaultMetrics', () => {
  metrics.init()
  expect(client.collectDefaultMetrics).toHaveBeenCalled()
})

test('metrics: counter should call client.Counter', () => {
  metrics.counter({ name: 'testing' }, 'inc')
  expect(client.Counter).toHaveBeenCalled()
})

test('metrics: gauge should call client.Gounter', () => {
  metrics.gauge({ name: 'testing' }, 'inc')
  expect(client.Gauge).toHaveBeenCalled()
})

test('metrics: Histogram should call client.Histogram', () => {
  metrics.Histogram({ name: 'testing' }, 'observe')
  expect(client.Histogram).toHaveBeenCalled()
})
