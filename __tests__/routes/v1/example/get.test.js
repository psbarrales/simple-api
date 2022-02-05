import get, { __action } from 'routes/v1/example/get'

test('routes: v1/example/get should export default method, route, handler', () => {
  expect(get).toEqual(
    expect.objectContaining({
      method: 'GET',
      route: '/find',
      handlers: expect.any(Array),
    }),
  )
})

test('routes: v1/example/get should action add ctx.body === "OK"', () => {
  const ctx = {}
  __action(ctx)
  expect(ctx.body).toEqual('OK')
})

test('routes: v1/example/get should throw error', async () => {
  try {
    await __action()
    expect(true).toBeFalsy()
  } catch (err) {
    expect(err).toBeDefined()
  }
})
