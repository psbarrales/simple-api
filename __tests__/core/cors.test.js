import cors from 'core/cors'
import koaCors from '@koa/cors'

jest.mock('@koa/cors', () => jest.fn())

test('core: cors and cors.use should be defined', () => {
  expect(cors).toBeDefined()
  expect(cors.use).toBeDefined()
})

test('core: cors.use should call @koa/cors middleware', () => {
  cors.use()
  expect(koaCors).toHaveBeenCalled()
})
