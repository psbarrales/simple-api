import Post from 'models/Post'

const action = async (ctx) => {
  try {
    const post = await Post.create({
      data: ctx.request.body,
    })
    ctx.body = post
  } catch (err) {
    ctx.throw(err)
  }
}

export default {
  method: 'POST',
  route: '/',
  handlers: [action],
}
