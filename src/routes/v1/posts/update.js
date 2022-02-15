import Post from 'models/Post'

const action = async (ctx) => {
  try {
    ctx.body = await Post.update({
      where: {
        id: parseInt(ctx.request.params.id),
      },
      data: ctx.request.body,
    })
  } catch (err) {
    ctx.throw(err)
  }
}

export default {
  method: 'PUT',
  route: '/:id',
  handlers: [action],
}
