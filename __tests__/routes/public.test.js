import publicRoute, { __getSendAction } from 'routes/public'
import koaRouter from 'koa-router'
import koaSend from 'koa-send'

jest.mock('koa-router')
jest.mock('koa-send', () => jest.fn())

test('routes: public should be defined', () => {
  expect(publicRoute).toBeDefined()
})

test('routes: public getSendAction should return a function', () => {
  const action = __getSendAction()
  expect(action).toBeDefined()
  expect(action).toEqual(expect.any(Function))
})

test('routes: public action should call koa-send', async () => {
  const action = __getSendAction()
  const ctx = {
    path: { replace: jest.fn() },
  }
  await action(ctx)
  expect(koaSend).toHaveBeenCalled()
})
