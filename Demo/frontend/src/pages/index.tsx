import React from 'react'
import { Link, Router, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import Devices from './devices'
import { createMemoryHistory } from 'history'
import Locations from './locations'
import Associations from './associations'
import { withKeycloak } from '@react-keycloak/nextjs'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
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

export default withKeycloak(Home)