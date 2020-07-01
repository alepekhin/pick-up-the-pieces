'use-strict'

module.exports = {
    Query: {
      clients: (_, __, {dataSources}) => {
        console.log('Inside resolver')
        return dataSources.db.getAllClients();
      },
      client: (_, {id}, {dataSources}) => {
        console.log('Inside resolver, id '+id)
        return dataSources.db.getClient(id);
      }
    },
    Mutation: {
      addClient: async (_, { clientInput }, { dataSources }) => {
        return  await dataSources.db.createClient(clientInput);
      },
      updateClient: async (_, { email, updateInput }, { dataSources }) => {
        return  await dataSources.db.updateClient(email, updateInput);
      }, 
      deleteClient: async (_, { email }, { dataSources }) => {
        return  await dataSources.db.deleteClient(email);
      }   
    }
  }