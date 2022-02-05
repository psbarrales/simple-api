import error from 'core/error'
import http from 'http'

jest.mock('http')

test('core: error and error.use should be defined', () => {
  expect(error).toBeDefined()
  expect(error.use).toBeDefined()
})

test('core: error.use should return middleware func', () => {
  expect(error.use()).toEqual(expect.any(Function))
})

test("core: next don't throw error and ctx.response.status === 404 should call ctx.throw(404) ", async () => {
  const middleware = error.use()
  const ctx = {
    response: {
      status: 404,
      body: false,
    },
    // accepts: jest.fn(),
    // render: jest.fn(),
    throw: jest.fn(),
    // app: {
    //   emit: jest.fn(),
    // },
  }
  const next = async () => Promise.resolve()
  await middleware(ctx, next)
  expect(ctx.throw).toHaveBeenCalled()
})

describe('core: next throw error on html case', () => {
  const ctx = {
    type: 'html',
    response: {
      status: 500,
      body: false,
    },
    accepts: () => 'html',
    render: jest.fn(),
    throw: jest.fn(),
    app: {
      emit: jest.fn(),
    },
  }
  test('core: next throw error should call ctx.render', async () => {
    const middleware = error.use()
    const next = async () => Promise.reject({ err: 500 })
    await middleware(ctx, next)
    // Should Emit Error
    expect(ctx.app.emit).toHaveBeenCalled()
    expect(ctx.render).toHaveBeenCalled()
    expect(ctx.type).toEqual('text/html')
  })
})

describe('core: next throw error on json case', () => {
  const ctx = {
    type: 'json',
    response: {
      status: 500,
      body: false,
    },
    accepts: () => 'json',
    render: jest.fn(),
    throw: jest.fn(),
    app: {
      emit: jest.fn(),
    },
  }
  test('core: next throw error should call add error to ctx.body', async () => {
    const middleware = error.use()
    const next = async () => Promise.reject({ err: 500 })
    await middleware(ctx, next)
    // Should Emit Error
    expect(ctx.body).toEqual(
      expect.objectContaining({
        originalError: expect.anything(),
      }),
    )
    expect(ctx.type).toEqual('application/json')
  })
})

describe('production case: core: next throw error on json case', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = {
      ...originalEnv,
      NODE_ENV: 'production',
    }
  })
  const ctx = {
    type: 'json',
    response: {
      status: 500,
      body: false,
    },
    accepts: () => 'json',
    render: jest.fn(),
    throw: jest.fn(),
    app: {
      emit: jest.fn(),
    },
  }

  test('core: next throw error should call add error to ctx.body', async () => {
    const middleware = error.use()
    const next = async () => Promise.reject({ err: 500, expose: true })
    await middleware(ctx, next)
    // Should Emit Error
    expect(ctx.body).toEqual(
      expect.objectContaining({
        originalError: expect.anything(),
      }),
    )
    expect(ctx.type).toEqual('application/json')
  })

  test('core: next throw error should call add error to ctx.body', async () => {
    const middleware = error.use()
    const next = async () => Promise.reject({ err: 500 })
    await middleware(ctx, next)
    // Should Emit Error
    expect(ctx.body).toEqual(
      expect.objectContaining({
        error: expect.anything(),
      }),
    )
    expect(ctx.type).toEqual('application/json')
  })

  afterEach(() => {
    process.env = originalEnv
  })
})
