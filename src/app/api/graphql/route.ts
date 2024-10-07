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

const mocks = {
  Contact: {
    __typename: 'Contact',
    id: () => '1',
    name: () => 'Tim',
    email: () => 'timvernaeve@gmail.com',
    phone: () => '0412457863'
  },
  Company: {
    __typename: 'Company',
    id: () => '2',
    name: () => 'Vertuoza',
    industry: () => 'Software',
    contactEmail: () => 'info@vertuoza.com'
  }
}

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs }),
    mocks
  })
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req })
})

export { handler as GET, handler as POST }
