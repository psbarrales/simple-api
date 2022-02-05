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

test('routes: default should create a new route', async () => {
  const api = {
    use: jest.fn(),
  }
  await metrics(api)
  expect(api.use).toHaveBeenCalled()
  expect(koaRouter).toHaveBeenCalled()
})

test('routes: action should call client.register.metrics', async () => {
  const ctx = {}
  await __action(ctx)
  expect(ctx.body).toEqual('Metrics called')
})
