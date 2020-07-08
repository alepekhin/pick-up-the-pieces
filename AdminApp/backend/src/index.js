const { ApolloServer } = require('apollo-server');
const typeDefs = require('./clients/schema');
const resolvers = require('./clients/resolvers');
const { Db } = require('./dist/clients/db');
const url = 'mongodb://localhost:27017';
const db_name = 'oauth';
const collection = 'oauth_clients';

const db = new Db(url, db_name, collection);

db.connect()

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    db: db,
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
