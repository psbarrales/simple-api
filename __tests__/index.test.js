import index from 'index'

jest.mock('core', () => ({
  init: jest.fn(),
}))

test('index should be defined', () => {
  expect(index).toBeDefined()
})
