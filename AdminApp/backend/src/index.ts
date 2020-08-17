const { ApolloServer } = require('apollo-server');
const typeDefs = require('../src/clients/schema');
const resolvers = require('../src/clients/resolvers');
import { Db } from './clients/db';
const url = 'mongodb://localhost:27017';
const db_name = 'oauth';
const collection = 'oauth_clients';

const db = new Db(url, db_name, collection);

db.connect()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    db,
  })
});

server.listen().then(({ url }:{url:string}) => {
  console.log(`🚀 Server ready at ${url}`);
});
