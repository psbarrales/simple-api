import body from 'core/body'
import koaBody from 'koa-body'

jest.mock('koa-body', () => jest.fn())

test('core: body and body.use should be defined', () => {
  expect(body).toBeDefined()
  expect(body.use).toBeDefined()
})

test('core: body.use should call koa-body middleware', () => {
  body.use()
  expect(koaBody).toHaveBeenCalled()
})
