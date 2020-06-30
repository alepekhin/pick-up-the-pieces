'use-strict'



module.exports = {
    Query: {
      clients: (_, __, {dataSources}) => {
          console.log('inside resolver')
        return dataSources.db.getAllClients();
      }
    }
  }

//module.exports = resolvers;