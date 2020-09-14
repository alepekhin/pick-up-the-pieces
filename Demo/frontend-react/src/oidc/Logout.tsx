import React, { useEffect } from 'react'
import { useSelector, connect } from 'react-redux'
import { OidcStore, clearState } from './OidcSlice'
import oidc from 'oidc'
import { identityServiceURL, realm, client_id, loginRedirectURL } from '../App'
import { Redirect } from 'react-router'
import Home from '../Home'

const Logout = ({clearState}:any) => {
    
    const oidcState = useSelector((item: OidcStore) => item.oidc)

    useEffect(
        () => {
            console.log('>>> inside logout effect, access_token '+oidcState.token!.access_token)
            console.log('>>> inside logout effect, refresh_token '+oidcState.token!.refresh_token!)
                
            const test = async () => {
                const o = new oidc(identityServiceURL)
                await o.init(realm)
                await o.logout(
                    oidcState.token!.access_token
                    ,oidcState.token!.refresh_token!
                    ,client_id
                    ,loginRedirectURL)
            }
            test()

       },[oidcState]
    )

    clearState()

    return (
        <Redirect to='/' />
    )
    
}

export default connect(null, { clearState })(Logout)
