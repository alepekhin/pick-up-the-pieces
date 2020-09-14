import React from 'react';
import ReactDOM from 'react-dom';
import { globalStore, persistor } from './GlobalStore';
import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <Provider store={globalStore}>
    <PersistGate loading={null} persistor={persistor}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

export default client
