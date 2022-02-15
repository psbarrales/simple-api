import { glob } from 'glob'
import fs from 'fs'
import path from 'path'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { mergeSchemas, addResolversToSchema } from '@graphql-tools/schema'

const SRC_PATH = `${process.cwd()}/src`
const SCHEMAS_PATH = '/graphql'

const use = async () => {
  const folders = getSchemasFolders(`${SRC_PATH}${SCHEMAS_PATH}`)
  const schemas = mergeSchemas({ schemas: folders.map(loadGraphQL) })
  return async function graphql(ctx, next) {
    ctx.schema = schemas
    await next()
  }
}

const getSchemasFolders = (directory) => {
  // Only uppercase folders is a GraphQL schema
  const matches = glob.sync(`${directory}/[A-Z]*`, {
    ignore: ['**/index.js', '**/*.ignore'],
  })
  return matches
}

const loadGraphQL = (folder) => {
  const schemaFile = path.join(folder, 'schema.graphql')
  const resolverFile = path.join(folder, 'resolvers.js')
  let resolvers = {}
  if (fs.existsSync(schemaFile)) {
    const schema = loadSchemaSync(schemaFile, {
      loaders: [new GraphQLFileLoader()],
    })
    if (fs.existsSync(resolverFile)) {
      resolvers = require(resolverFile).default
    }
    return addResolversToSchema({
      schema,
      resolvers,
    })
  } else {
    throw new Error(
      `schema.graphql not found on folder graphql/${path.basename(folder)}`,
    )
  }
}

export default {
  use,
}
