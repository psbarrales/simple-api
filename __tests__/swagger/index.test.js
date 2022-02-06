import swagger, { __options } from 'swagger'
import swaggerJsdoc from 'swagger-jsdoc'

jest.mock('swagger-jsdoc', () => jest.fn())

test('swagger should be defined', () => {
  expect(swagger).toBeDefined()
})

test('swagger should call swaggerJsdoc', async () => {
  await swagger()
  expect(swaggerJsdoc).toHaveBeenCalled()
})

test('swagger.options should return definitions and api', async () => {
  const options = await __options()
  expect(options).toEqual(
    expect.objectContaining({
      definition: expect.any(Object),
      apis: expect.any(Array),
    }),
  )
})
