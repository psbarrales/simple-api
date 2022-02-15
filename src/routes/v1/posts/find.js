import Post from 'models/Post'

const action = async (ctx) => {
  try {
    ctx.body = await Post.find()
  } catch (err) {
    ctx.throw(err)
  }
}

export default {
  method: 'GET',
  route: '/',
  handlers: [action],
}
