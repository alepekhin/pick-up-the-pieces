import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import globalStore from './GlobalStore';
import { Provider } from 'react-redux';
import Locations from './locations/Location';
import Devices from './devices/Device';
import Associations from './associations/Association';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Dashboard from './components/Dashboard';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  //link: authLink.concat(httpLink)
})

ReactDOM.render(
        <Provider store={globalStore}>
        <ApolloProvider client={client}>
        <Dashboard />
        </ApolloProvider>
        </Provider>,
  document.getElementById('root')
)

export default client
