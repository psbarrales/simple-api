import Post from 'models/Post'

const action = async (ctx) => {
  try {
    ctx.body = await Post.findOne({
      where: {
        id: parseInt(ctx.request.params.id),
      },
    })
  } catch (err) {
    ctx.throw(err)
  }
}

export default {
  method: 'GET',
  route: '/:id',
  handlers: [action],
}
