const { connect } = require('mongoose');
const { ApolloServer } = require('apollo-server-micro');
const Cors = require('micro-cors')
const typeDefs = require('../../graphql/schema');
const resolvers = require('../../graphql/resolver');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const cors = Cors()

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await connect(process.env.DB_URL)

  await startServer

  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false
  }
}
