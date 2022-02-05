async function addAPITag(ctx, next) {
  ctx.set('X-Api-Name', 'Simple API')
  next()
}

export default addAPITag
