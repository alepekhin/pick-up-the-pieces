import React from 'react'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import Devices from './devices'
import { createMemoryHistory } from 'history'
import Locations from './locations'
import Associations from './associations'
import { setContext } from '@apollo/client/link/context';

/*
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
*/
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  //link: authLink.concat(httpLink)
});

const history = createMemoryHistory();

function Home() {
  return (
    <ApolloProvider client={client}>
      <Devices />
      <Locations />
      <Associations />
    </ApolloProvider>
  )
}

export default Home