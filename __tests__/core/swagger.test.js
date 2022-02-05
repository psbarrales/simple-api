import swagger from 'core/swagger'
import { koaSwagger } from 'koa2-swagger-ui'
import swaggerIndex from 'swagger/index'

jest.mock('koa2-swagger-ui', () => ({ koaSwagger: jest.fn() }))
jest.mock('swagger/index', () => jest.fn())

test('core: swagger and swagger.use should be defined', () => {
  expect(swagger).toBeDefined()
  expect(swagger.use).toBeDefined()
})

describe('Production Swagger', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = {
      ...originalEnv,
      NODE_ENV: 'production',
    }
  })

  test('core: swagger.use should not call swaggerIndex and koaSwagger', () => {
    swagger.use()
    expect(swaggerIndex).not.toHaveBeenCalled()
    expect(koaSwagger).not.toHaveBeenCalled()
  })

  afterEach(() => {
    process.env = originalEnv
  })
})

describe('Non-Production Swagger', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = {
      ...originalEnv,
      NODE_ENV: 'staging',
    }
  })

  test('core: swagger.use should call swaggerIndex and koaSwagger', async () => {
    const fakeKoa = {}
    await swagger.use(fakeKoa)
    expect(swaggerIndex).toHaveBeenCalled()
    expect(koaSwagger).toHaveBeenCalled()
  })

  afterEach(() => {
    process.env = originalEnv
  })
})
