import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Page from "./Page"
import Home  from "./Home"
import oidc  from "oidc"

export const identityServiceURL = 'http://localhost:8080/auth'
export const realm = 'demo'
export const client_id = 'demo-backend'
export const loginRedirectURL = 'http://localhost:3000'

const App = () => {

    const [authUrl, setAuthUrl] = useState('')
    
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

    return (
            <Router>
                <Route path='/page' component={Page} />
                <Route path='/login' component={() => {
                    window.location.href = authUrl
                    return null;
                }} />
                <Route exact path='/' component={Home} />
            </Router>
    )
}

export default App
