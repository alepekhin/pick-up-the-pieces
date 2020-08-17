const { gql } = require('apollo-server');

const typeDefs = gql`
type Location {
    location: String!
}

input LocationInput {
    location: String!
}

type Query {
    locations: [Location]!
}

type Mutation {
    addLocation(locationInput: LocationInput!): SaveLocationResponse!
    deleteLocation(location: String!): SaveLocationResponse!
}

type SaveLocationResponse {
    success: Boolean!
    message: String
    location: Location
}
`;

module.exports = typeDefs;