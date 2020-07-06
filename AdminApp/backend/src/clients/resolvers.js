'use-strict'

const resolvers = {
    Query: {
      clients: (_, __, {dataSources}) => {
        return dataSources.db.getClients();
      },
      client: (_, {id}, {dataSources}) => {
        return dataSources.db.getClient(id);
      }
    },
    Mutation: {
      addClient: async (_, { clientInput }, { dataSources }) => {
        return  await dataSources.db.createClient(clientInput);
      },
      updateClient: async (_, { client_id, updateInput }, { dataSources }) => {
        return  await dataSources.db.updateClient(client_id, updateInput);
      }, 
      deleteClient: async (_, { client_id }, { dataSources }) => {
        return  await dataSources.db.deleteClient(client_id);
      }   
    }
  }

  module.exports = resolvers