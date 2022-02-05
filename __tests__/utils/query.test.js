import { filterQuery, fieldsQuery, optionsQuery } from 'utils/query'

test('query: filterQuery está definido', () => {
  expect(filterQuery).toBeDefined()
})

test('query: filterQuery: return where from ctx.query.filter', () => {
  let ctx = {
    query: {
      filter: JSON.stringify({
        where: { brand: 'testing' },
      }),
    },
  }
  expect(filterQuery(ctx)).toMatchObject({ brand: 'testing' })

  ctx = {
    query: {
      filter: {
        where: { brand: 'testing' },
      },
    },
  }
  expect(filterQuery(ctx)).toMatchObject({ brand: 'testing' })

  ctx = {
    query: {
      filter: JSON.stringify({
        where: { id: 'testing' },
      }),
    },
  }
  expect(filterQuery(ctx)).toMatchObject({ _id: 'testing' })
})

test('query: fieldsQuery está definido', () => {
  expect(fieldsQuery).toBeDefined()
})

test('query: fieldsQuery: return fields from ctx.query.filter', () => {
  let ctx = {
    query: {
      filter: JSON.stringify({
        fields: 'brand',
      }),
    },
  }
  expect(fieldsQuery(ctx)).toStrictEqual('brand')

  ctx = {
    query: {
      filter: JSON.stringify({
        fields: ['brand'],
      }),
    },
  }
  expect(fieldsQuery(ctx)).toEqual(expect.arrayContaining(['brand']))

  ctx = {
    query: {
      filter: {},
    },
  }

  expect(fieldsQuery(ctx)).toMatchObject({})
})

test('query: optionsQuery está definido', () => {
  expect(optionsQuery).toBeDefined()
})

test('query: optionsQuery: return limit from ctx.query.filter', () => {
  let ctx = {
    query: {
      filter: JSON.stringify({
        limit: 10,
      }),
    },
  }

  expect(optionsQuery(ctx)).toEqual(expect.objectContaining({ limit: 10 }))

  ctx = {
    query: {
      filter: JSON.stringify({
        limit: 5,
      }),
    },
  }
  expect(optionsQuery(ctx)).toEqual(expect.objectContaining({ limit: 5 }))
})

test('query: optionsQuery: return sort from ctx.query.filter', () => {
  let ctx = {
    query: {
      filter: JSON.stringify({
        sort: { brand: 1 },
      }),
    },
  }

  expect(optionsQuery(ctx)).toEqual(
    expect.objectContaining({ sort: { brand: 1 } }),
  )

  ctx = {
    query: {
      filter: JSON.stringify({
        sort: { price: -1 },
      }),
    },
  }
  expect(optionsQuery(ctx)).toEqual(
    expect.objectContaining({ sort: { price: -1 } }),
  )
})

test('query: optionsQuery: return skip from ctx.query.filter', () => {
  let ctx = {
    query: {
      filter: JSON.stringify({
        skip: 10,
      }),
    },
  }

  expect(optionsQuery(ctx)).toEqual(expect.objectContaining({ skip: 10 }))

  ctx = {
    query: {
      filter: JSON.stringify({
        skip: 5,
      }),
    },
  }
  expect(optionsQuery(ctx)).toEqual(expect.objectContaining({ skip: 5 }))
})
