import Post from 'models/Post'

const resolver = {
  Query: {
    posts: () => {
      return Post.find()
    },
    post: (_, args) => {
      return Post.findOne({
        where: {
          id: args.id,
        },
      })
    },
  },
}

export default resolver
