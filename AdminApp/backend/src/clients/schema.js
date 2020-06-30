const { gql } = require('apollo-server');

const typeDefs = gql`
type Client {
    id: ID!
    email: String
    email_verified: Boolean
    name: String
    roles: String
}

input ClientInput {
    email: String
    email_verified: Boolean
    name: String
    roles: String
}

type Query {
      clients: [Client]!
  }

  type Mutation {
      addClient(client: ClientInput!): SaveClientResponse!
      updateClient(id: ID!, client: ClientInput!): SaveClientResponse!
      deleteClient(id: ID!): SaveClientResponse!
  }

  type SaveClientResponse {
      success: Boolean!
      message: String
      client: Client
  }
`;

module.exports = typeDefs;