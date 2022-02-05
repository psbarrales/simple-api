import helmet from 'core/helmet'
import koaHelmet from 'koa-helmet'

jest.mock('koa-helmet', () => jest.fn())

test('core: helmet and helmet.use should be defined', () => {
  expect(helmet).toBeDefined()
  expect(helmet.use).toBeDefined()
})

test('core: helmet.use should call koa-helmet middleware', () => {
  helmet.use()
  expect(koaHelmet).toHaveBeenCalled()
})
