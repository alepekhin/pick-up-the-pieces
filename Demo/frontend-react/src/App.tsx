import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Page from "./Page"
import Home from "./Home"
import oidc, { Token } from "oidc"
import { useSelector } from "react-redux"
import { ApolloProvider, createHttpLink, InMemoryCache, ApolloClient } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

import { OidcStore } from "./OidcSlice"

export const identityServiceURL = 'http://localhost:8080/auth'
export const realm = 'demo'
export const client_id = 'demo-backend'
export const loginRedirectURL = 'http://localhost:3000'

const App = () => {

    const [authUrl, setAuthUrl] = useState('')
    const oidcState = useSelector((item: OidcStore) => item.oidc)

    useEffect(
        () => {
            const init = async () => {
                let o = new oidc(identityServiceURL)
                await o.init(realm)
                setAuthUrl(o.getLoginURL(client_id, loginRedirectURL))
            }
            init()
        }
    )

    const httpLink = createHttpLink({
        uri: 'http://localhost:4000/graphql',
    });

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = oidcState.token as Token
        const access_token = token.access_token
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${access_token}` : "",
            }
        }
    });

    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });


    return (
        <ApolloProvider client={client}>
            <Router>
                <Route path='/page' component={Page} />
                <Route path='/login' component={() => {
                    window.location.href = authUrl
                    return null;
                }} />
                <Route exact path='/' component={Home} />
            </Router>
        </ApolloProvider>
    )
}

export default App
