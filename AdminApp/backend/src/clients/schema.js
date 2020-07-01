const { gql } = require('apollo-server');

const typeDefs = gql`
type Client {
    _id: ID!
    email: String!
    name: String
    roles: String
}

input ClientInput {
    email: String
    name: String
    roles: String
}

input UpdateInput {
    name: String
    roles: String
}

type Query {
    clients: [Client]!
    client(id: String): Client
}

type Mutation {
    addClient(clientInput: ClientInput!): SaveClientResponse!
    updateClient(email: String!, updateInput: UpdateInput!): SaveClientResponse!
    deleteClient(email: String!): SaveClientResponse!
}

type SaveClientResponse {
    success: Boolean!
    message: String
    client: Client
}
`;

module.exports = typeDefs;