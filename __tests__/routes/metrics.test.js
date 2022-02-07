import metrics, { __action } from 'routes/metrics'
import koaRouter from 'koa-router'

jest.mock('koa-router')
jest.mock('utils/metrics', () => ({
  client: {
    register: {
      metrics: () => 'Metrics called',
    },
  },
}))

test('routes: metrics should be defined', () => {
  expect(metrics).toBeDefined()
})

test('routes: action should call client.register.metrics', async () => {
  const ctx = {}
  await __action(ctx)
  expect(ctx.body).toEqual('Metrics called')
})
