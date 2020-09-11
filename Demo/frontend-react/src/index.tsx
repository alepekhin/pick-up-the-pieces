import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import globalStore from './GlobalStore';
import { Provider } from 'react-redux';
import Locations from './locations/Location';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  //link: authLink.concat(httpLink)
})

ReactDOM.render(
        <Provider store={globalStore}>
        <ApolloProvider client={client}>
        <Locations />
        </ApolloProvider>
        </Provider>,
  document.getElementById('root')
)

export default client
