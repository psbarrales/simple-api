import { graphqlHTTP } from 'koa-graphql'

export default {
  method: 'ALL',
  route: '/graphql',
  handlers: [
    graphqlHTTP(async (request, response, ctx, graphQLParams) => ({
      schema: ctx.schema,
      graphiql: true,
    })),
  ],
}
