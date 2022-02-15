import health, {
  __healthAction,
  __setResponseBody,
  __stringAction,
} from 'routes/health'
import koaRouter from '@koa/router'

jest.mock('@koa/router')
jest.mock('koa-send', () => jest.fn())

test('routes: health should be defined', () => {
  expect(health).toBeDefined()
})

test('routes: health healthAction should return a function', () => {
  const action = __healthAction()
  expect(action).toBeDefined()
  expect(action).toEqual(expect.any(Function))
})

test('routes: health stringAction should return a function', () => {
  const action = __stringAction()
  expect(action).toBeDefined()
  expect(action).toEqual(expect.any(Function))
})

test('routes: health action should change ctx.body', async () => {
  const action = __healthAction({}, 0)
  const ctx = {
    body: '',
  }
  await action(ctx)
  expect(ctx.body).not.toEqual('')
})

test('routes: health string action should change ctx.body', async () => {
  const action = __stringAction('TEST')
  const ctx = {
    body: '',
  }
  await action(ctx)
  expect(ctx.body).toEqual('TEST')
})
