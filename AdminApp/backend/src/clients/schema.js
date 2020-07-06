const { gql } = require('apollo-server');

const typeDefs = gql`
type Client {
    _id: ID!
    client_id: String!
    client_secret: String!
    redirect_uris: [String]!
}

input ClientInput {
    client_id: String!
    client_secret: String!
    redirect_uris: [String]!
}

input UpdateInput {
    client_secret: String!
    redirect_uris: [String]!
}

type Query {
    clients: [Client]!
    client(client_id: String!): Client
}

type Mutation {
    addClient(clientInput: ClientInput!): SaveClientResponse!
    updateClient(client_id: String!, updateInput: UpdateInput!): SaveClientResponse!
    deleteClient(client_id: String!): SaveClientResponse!
}

type SaveClientResponse {
    success: Boolean!
    message: String
    client: Client
}
`;

module.exports = typeDefs;