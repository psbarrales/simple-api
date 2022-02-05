import compress, { __filter } from 'core/compress'
import koaCompress from 'koa-compress'

jest.mock('koa-compress', () => jest.fn())

test('core: compress and compress.use should be defined', () => {
  expect(compress).toBeDefined()
  expect(compress.use).toBeDefined()
})

test('core: compress.use should call koa-compress middleware', () => {
  compress.use()
  expect(koaCompress).toHaveBeenCalled()
})

test('core: compress.filter should return true on text/*', () => {
  expect(__filter('text/plain')).toBe(true)
})

test('core: compress.filter should return falsy on distinct text/*', () => {
  expect(__filter('image/png')).toBeFalsy()
  expect(__filter('application/octet-stream')).toBeFalsy()
  expect(__filter('video/ogg')).toBeFalsy()
})
