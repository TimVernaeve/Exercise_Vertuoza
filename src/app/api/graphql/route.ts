import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addMocksToSchema } from '@graphql-tools/mock'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { type NextRequest } from 'next/server'

const typeDefs = loadSchemaSync('src/graphql/schema.graphql', {
  loaders: [new GraphQLFileLoader()]
})

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs })
  })
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req })
})

export { handler as GET, handler as POST }
