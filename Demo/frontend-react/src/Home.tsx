import React, { useState, useEffect } from "react"
import { realm, client_id, identityServiceURL } from "./App"
import { connect, useSelector } from "react-redux"
import { setEndpoint, setToken, OidcStore } from './oidc/OidcSlice'
import oidc from "oidc"
import { Redirect, Link } from "react-router-dom"

const Home = ({ setEndpoint, setToken }: any) => {

    const [logged, setLogged] = useState(false)
    const oidcState = useSelector((item: OidcStore) => item.oidc)

    if (oidcState.token?.access_token) {
        return (
            <div>
                <h1>You are logged in</h1>
                <Link to="/dashboard">Dashboard</Link>
                <p/>
                <Link to="/logout">Logout</Link>
            </div>
        )
    } else {
        return (
            <div>
                <h1>You are not logged in</h1>
                <p />
                <a href='/login'>Login</a>
            </div>
        )
    }
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


export default connect(null, { setEndpoint, setToken })(Home)
