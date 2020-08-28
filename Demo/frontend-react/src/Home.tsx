import React, { useState, useEffect } from "react"
import { realm, client_id, identityServiceURL } from "./App"
import { connect } from "react-redux"
import { setEndpoint, setToken } from './OidcSlice'
import oidc from "oidc"
import { Link } from "react-router-dom"

const Home = ({ setEndpoint, setToken }: any) => {

    const [logged, setLogged] = useState(false)

    useEffect(
        () => {
            const test = async () => {
                let o = new oidc(identityServiceURL)
                await o.init(realm)
                setEndpoint(o.endpoint)
                if (o.token.access_token.length === 0) {
                    let code = getQueryVariable('code')
                    if (code) {
                        const getToken = async (code: string) => {
                            await o.getTokenAuth(client_id, code, 'http://localhost:3000')
                            setToken(o.token)
                            setLogged(true)
                        }
                        getToken(code)
                    }
                }
            }
            test()
        },[setEndpoint, setToken]
    )


    return (
        <div>
            <h1>Home page, logged {logged?'true':'false'}</h1>
            <p/>
            <a href='/login'>Login</a>
            <p/>
            <Link to="/page">Protected page</Link> 
        </div>
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


export default connect(null, { setEndpoint, setToken })(Home)
