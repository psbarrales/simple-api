import api, { __core, __middleware, __module } from 'core/api'
import Koa from 'koa'
import glob from 'glob'
import query from 'koa-qs'
import fakeRunModule from 'fakeRunModule'

jest.mock('koa')
jest.mock('glob')
jest.mock('koa-qs')
jest.mock('fakeUseModule')
jest.mock('fakeRunModule')

test('core: api should be defined', () => {
  expect(api).toBeDefined()
})
test('core:  __core, __middleware, __module should be defined', () => {
  expect(__core).toBeDefined()
  expect(__middleware).toBeDefined()
  expect(__module).toBeDefined()
})

test('core: api: module expect use function be on module', async () => {
  const fakeUseModuleName = 'fakeUseModule'
  const koa = {
    use: jest.fn(),
  }
  await __module(fakeUseModuleName, koa)
  expect(koa.use).toHaveBeenCalled()
})

test('core: api: module expect run function be on module', () => {
  const fakeRunModuleName = 'fakeRunModule'
  const koa = {
    use: jest.fn(),
  }
  __module(fakeRunModuleName, koa)
  expect(fakeRunModule.run).toHaveBeenCalled()
})
