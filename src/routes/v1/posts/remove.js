import Post from 'models/Post'

const action = async (ctx) => {
  try {
    ctx.body = await Post.deleteOne({
      where: {
        id: parseInt(ctx.request.params.id),
      },
    })
  } catch (err) {
    ctx.throw(err)
  }
}

export default {
  method: 'DELETE',
  route: '/:id',
  handlers: [action],
}
