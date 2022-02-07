import api, { __core, __middleware, __module } from 'core/api'
import Koa from 'koa'
import fakeRunModule from 'fakeRunModule'

jest.mock('koa')
jest.mock('koa-qs', () => jest.fn())
jest.mock('fakeUseModule')
jest.mock('fakeRunModule')

test('core: api should be defined', () => {
  expect(api).toBeDefined()
})
test('core:  core, middleware, module should be defined', () => {
  expect(__core).toBeDefined()
  expect(__middleware).toBeDefined()
  expect(__module).toBeDefined()
})

describe('core: api: module', () => {
  test('core: api: module expect use function be on module', async () => {
    const fakeUseModuleName = 'fakeUseModule'
    const koa = {
      use: jest.fn(),
    }
    await __module(fakeUseModuleName, koa)
    expect(koa.use).toHaveBeenCalled()
  })

  test('core: api: module expect run function be on module', async () => {
    const fakeRunModuleName = 'fakeRunModule'
    const koa = {
      use: jest.fn(),
    }
    await __module(fakeRunModuleName, koa)
    expect(fakeRunModule.run).toHaveBeenCalled()
  })
})

describe('core: api core method', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  test('core: api: core method should call koa.use', async () => {
    const koa = {
      use: jest.fn(),
    }
    jest.setMock('glob', {
      sync: () => ['fakeUseModule'],
    })
    const { __core } = require('core/api')
    await __core(koa)
    expect(koa.use).toHaveBeenCalled()
  })
  // test('core: api: core should not call module', async () => {
  //   jest.setMock('glob', (x, y, z) => {
  //     z(new Error())
  //   })
  //   const { __core } = require('core/api')
  //   await expect(async () => {
  //     await __core()
  //   }).rejects.toThrowError()
  // })
})

describe('core: api middleware on error', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  test('core: api: middleware should call koa.use', async () => {
    const koa = {
      use: jest.fn(),
    }
    jest.setMock('glob', {
      sync: () => ['fakeUseModule'],
    })
    const { __middleware } = require('core/api')
    await __middleware(koa)
    expect(koa.use).toHaveBeenCalled()
  })
  // test('core: api: middleware should not call module', async () => {
  //   jest.setMock('glob', (x, y, z) => {
  //     z(new Error())
  //   })
  //   const { __middleware } = require('core/api')
  //   await expect(async () => {
  //     await __middleware()
  //   }).rejects.toThrowError()
  // })
})

describe('core: default api', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.setMock('glob', {
      sync: () => [],
    })
    Koa.mockClear()
  })
  test('core: api: should call Koa, core, middleware and koa-qs', async () => {
    const koaQuery = jest.fn()
    jest.setMock('koa-qs', koaQuery)
    jest.setMock('koa', Koa)
    const api = require('core/api').default
    await api()
    expect(Koa).toHaveBeenCalled()
    expect(koaQuery).toHaveBeenCalled()
  })
})
