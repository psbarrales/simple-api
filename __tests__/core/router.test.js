import router, { __createFileRoute, __createDirectoryRoutes } from 'core/router'
import sinon from 'sinon'
import Koa from 'koa'
import Router from 'koa-router'

jest.mock('koa')
// jest.mock('koa-router')
jest.mock('fakeRoute')

test('core: router and router.run should be defined', () => {
  expect(router).toBeDefined()
  expect(router.run).toBeDefined()
})

describe('router.run', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.setMock('fs', {
      lstatSync: () => ({
        isDirectory: () => false,
      }),
    })
  })
  test('core: router.run should call koa.use', async () => {
    jest.setMock('glob', {
      sync: () => [],
    })
    const router = require('core/router').default
    const koa = {
      use: jest.fn().mockImplementation(() => ({ use: () => {} })),
    }
    await router.run(koa)
    expect(router.run).toBeDefined()
  })
})

describe('core: router: createFileRoute', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('on bad definition route should throw error', () => {
    jest.setMock('fakeRoute', {
      default: {
        methods: 'ASD',
        routes: '/',
      },
    })
    const router = new Router()
    const { __createFileRoute } = require('core/router')
    expect(() => {
      __createFileRoute('fakeRoute', router)
    }).toThrow()
  })

  test('on bad array definitions route should throw error', () => {
    jest.setMock('fakeRoute', {
      default: [
        {
          methods: 'ASD',
          routes: '/',
        },
      ],
    })
    const router = new Router()
    const { __createFileRoute } = require('core/router')
    expect(() => {
      __createFileRoute('fakeRoute', router)
    }).toThrow()
  })

  test('on route GET should call get fn from new Router ', () => {
    const mockGet = jest.fn()
    jest.setMock('fakeRoute', {
      default: {
        method: 'GET',
        route: '/',
        handlers: [() => {}],
      },
    })
    jest.mock('koa-router', () => {
      return jest.fn().mockImplementation(() => {
        return { get: mockGet }
      })
    })
    const router = new Router()
    const routerGetSpy = sinon.spy(router, 'get')
    const { __createFileRoute } = require('core/router')
    __createFileRoute('fakeRoute', router)
    expect(routerGetSpy.called).toBeTruthy()
  })
})

describe('core: router: createDirectoryRoutes', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.setMock('fakeRoute', {
      default: {
        method: 'GET',
        route: '/',
        handlers: [() => {}],
      },
    })
  })
  test('on a directory should call router use', () => {
    let call = 0
    const isDirectory = sinon.stub()
    isDirectory.onCall(0).returns(true)
    isDirectory.onCall(1).returns(false)
    jest.unmock('koa-router')
    jest.setMock('fs', {
      lstatSync: () => ({
        isDirectory: () => {
          ++call
          return call === 1
        },
      }),
    })
    jest.setMock('glob', {
      sync: () => ['fakeRoute'],
    })
    const router = new Router()
    const { __createDirectoryRoutes } = require('core/router')
    __createDirectoryRoutes('fakeRoute', router)
  })
})
