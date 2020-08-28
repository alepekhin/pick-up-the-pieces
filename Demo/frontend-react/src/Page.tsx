import React, { useState, useEffect } from "react"
import { useStore, useSelector } from "react-redux"
import oidc, { Token, Endpoint, OidcState } from "oidc"
import { identityServiceURL, realm, client_id } from "./App"
import { OidcStore } from "./OidcSlice"

const Page = () => {

    const [roles, setRoles] = useState<string[]>([])
    const oidcState = useSelector((item:OidcStore) => item.oidc)

    useEffect(
        () => {
            const test = async () => {
                let o = new oidc(identityServiceURL)
                o.endpoint = oidcState.endpoint as Endpoint
                o.token = oidcState.token as Token
                if (oidcState.token != null) {
                    let roles = await o.getRoles(oidcState.token.access_token as string, client_id)
                    setRoles(roles)
                }
            }
            if (roles.length === 0) {
                test()
            } else {

            }
        }
    )

    console.log('Page: roles '+JSON.stringify(roles))

    if (roles.includes('admin')) {
        return (
            <div>
                <h1>This page is available for admins only</h1>
            </div>
        )
    } else {
        return (
            <div>
                <h1>This page is unavailable for you</h1>
            </div>
        )
    }
}

export default Page
