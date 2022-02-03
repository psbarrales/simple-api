async function addAPITag(ctx, next) {
  ctx.tag = true
  ctx.set('X-Tag', 'Tag Ready')
  next()
}

export default addAPITag
