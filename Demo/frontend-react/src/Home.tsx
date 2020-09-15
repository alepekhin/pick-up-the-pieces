import React  from "react"
import { connect, useSelector } from "react-redux"
import { setEndpoint, setToken, OidcStore } from './oidc/OidcSlice'
import { Link } from "react-router-dom"

const Home = ({ setEndpoint, setToken }: any) => {

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

export default connect(null, { setEndpoint, setToken })(Home)
