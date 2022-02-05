import logger, { __transporter } from 'core/logger'
import koaLogger from 'koa-logger'
import koaConvert from 'koa-convert'

jest.mock('koa-logger', () => jest.fn())
jest.mock('koa-convert', () => jest.fn())
jest.spyOn(console, 'info').mockImplementation()

test('core: logger and logger.use should be defined', () => {
  expect(logger).toBeDefined()
  expect(logger.use).toBeDefined()
})

test('core: logger.use should call koa-logger middleware', () => {
  logger.use()
  expect(koaLogger).toHaveBeenCalled()
})

test('core: logger.use should call koa-convert middleware', () => {
  logger.use()
  expect(koaConvert).toHaveBeenCalled()
})

test('core: logger.transporter should call console.info', () => {
  __transporter('', [])
  expect(console.info).toHaveBeenCalled()
})
