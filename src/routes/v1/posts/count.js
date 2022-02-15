import Post from 'models/Post'

const action = async (ctx) => {
  try {
    ctx.body = {
      count: await Post.count(),
    }
  } catch (err) {
    ctx.throw(err)
  }
}

export default {
  method: 'GET',
  route: '/count',
  handlers: [action],
}
