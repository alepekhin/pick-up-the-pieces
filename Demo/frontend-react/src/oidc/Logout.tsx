import React, { useEffect } from 'react'
import { useSelector, connect } from 'react-redux'
import { OidcStore, clearState } from './OidcSlice'
import oidc from 'oidc'
import { identityServiceURL, realm, client_id, loginRedirectURL } from '../App'
import { Redirect } from 'react-router'

const Logout = ({clearState}:any) => {
    
    const oidcState = useSelector((item: OidcStore) => item.oidc)

    useEffect(
        () => {
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
            clearState()

       },[clearState, oidcState.token]
    )


    return (
        <Redirect to='/' />
    )
    
}

export default connect(null, { clearState })(Logout)
