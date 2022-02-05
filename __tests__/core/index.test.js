import index, { __listen } from 'core/index'
import api from 'core/api'

const mockListen = jest.fn()

jest.mock('core/api', () =>
  jest.fn(() => ({
    listen: mockListen,
  })),
)

jest.spyOn(console, 'info').mockImplementation()

test('core: index and index.init should be defined', () => {
  expect(index).toBeDefined()
  expect(index.init).toBeDefined()
})

test('core: index.init should call core/api and listen', async () => {
  await index.init()
  expect(api).toHaveBeenCalled()
  expect(mockListen).toHaveBeenCalled()
})

test('core: index.listen should call console.info', () => {
  __listen()
  expect(console.info).toHaveBeenCalled()
})
