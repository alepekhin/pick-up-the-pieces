import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from "./Home"
import oidc, { Token, UserInfo } from "oidc"
import { useSelector, connect } from "react-redux"
import { createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { setEndpoint, setToken, OidcStore, setRoles, setUserInfo } from './oidc/OidcSlice'

import Dashboard from "./dashboard/Dashboard"
import Logout from "./oidc/Logout"

export const identityServiceURL = 'http://localhost:8080/auth'
export const realm = 'demo'
export const client_id = 'demo-backend'
export const loginRedirectURL = 'http://localhost:3000'

const App = ({ setEndpoint, setToken, setRoles }: any) => {

    const [authUrl, setAuthUrl] = useState('')
    const oidcState = useSelector((item: OidcStore) => item.oidc)

    useEffect(
        () => {
            const test = async () => {
                const o = new oidc(identityServiceURL)
                await o.init(realm)
                setAuthUrl(o.getLoginURL(client_id, loginRedirectURL))
                setEndpoint(o.endpoint)
                if (o.token.access_token.length === 0) {
                    let code = getQueryVariable('code')
                    if (code) {
                        const getToken = async (code: string) => {
                            await o.getTokenAuth(client_id, code, 'http://localhost:3000')
                            setToken(o.token)
                            const roles = await o.getRoles(o.token.access_token as string, client_id)
                            setRoles(roles)
                            const userInfo = await getUserInfo(o.token.access_token)

                            if (userInfo !== null) {
                                setUserInfo(userInfo)
                            }
                        }
                        getToken(code)
                    }
                }
            }
            //if (!oidcState.token?.access_token) {
                test()
            //}
        }, [setEndpoint, setToken]
    )

    const getUserInfo = async (access_token: string) => {
            const o = new oidc(identityServiceURL)
            await o.init(realm)
            await o.getUserInfo(access_token)
            return o.userInfo 
    }

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
    console.log('Inside App '+oidcState.token?.access_token)

    return (
            <Router>
                <Route path='/login' component={() => {
                    window.location.href = authUrl
                    return null;
                }} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/logout" component={Logout} />
                <Route exact path='/' component={Home} />
            </Router>
    )
}

function getQueryVariable(variable: string) {
    var query = window.location.search.substring(1);
    //console.log(query)//"app=article&act=news_content&aid=160990"
    var vars = query.split("&");
    //console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        //console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ] 
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
}

export default connect(null, { setEndpoint, setToken, setRoles, setUserInfo })(App)
