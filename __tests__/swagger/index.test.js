import swagger, { __options } from 'swagger'
import openapiJSDoc from 'openapi-jsdoc'

jest.mock('openapi-jsdoc', () => jest.fn())

test('swagger should be defined', () => {
  expect(swagger).toBeDefined()
})

test('swagger should call openapiJSDoc', async () => {
  await swagger()
  expect(openapiJSDoc).toHaveBeenCalled()
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
