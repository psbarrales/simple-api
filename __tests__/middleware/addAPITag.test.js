import addAPITag from 'middleware/addAPITag'

test('middleware: addAPITag should be defined', () => {
  expect(addAPITag).toBeDefined()
})

test('middleware: addAPITag shoud call set on ctx and next', () => {
  const ctx = {
    set: jest.fn(),
  }
  const next = jest.fn()
  addAPITag(ctx, next)
  expect(ctx.set).toHaveBeenCalled()
  expect(next).toHaveBeenCalled()
})
