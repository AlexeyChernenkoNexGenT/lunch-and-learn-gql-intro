const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const createAuthorizeFunc = require('./auth');
const { models, db } = require('./db');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    return { models, db, authorize: createAuthorizeFunc(req.headers.authorization) };
  },
  formatError: (err) => {
    if (err.originalError) {
      return {
        code: err.originalError.code,
        message: err.originalError.message,
      }
    }

    return err;
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
