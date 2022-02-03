function filterQuery(ctx) {
  try {
    const where =
      typeof ctx.query.filter === 'string'
        ? JSON.parse(ctx.query.filter || '{}').where
        : ctx.query.filter.where
    if (where.id) {
      where._id = where.id
      delete where.id
    }
    return where
  } catch (e) {}
  return {}
}

function fieldsQuery(ctx) {
  try {
    const fields = JSON.parse(ctx.query.filter).fields
    return fields
  } catch (e) {}
  return {}
}

function optionsQuery(ctx) {
  try {
    const optionsFromQuery = JSON.parse(ctx.query.filter)
    const options = {}
    if (optionsFromQuery.limit) {
      options.limit = optionsFromQuery.limit
    }
    if (optionsFromQuery.sort) {
      options.sort = optionsFromQuery.sort
    }
    if (optionsFromQuery.skip) {
      options.skip = optionsFromQuery.skip
    }
    return options
  } catch (e) {}
  return {}
}

export { filterQuery, fieldsQuery, optionsQuery }
