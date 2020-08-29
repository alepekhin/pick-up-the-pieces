import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import oidc, { Token, Endpoint } from "oidc"
import { identityServiceURL, client_id } from "./App"
import { OidcStore } from "./OidcSlice"
import { useQuery, gql } from '@apollo/client'

const QUERY = gql`
  {
    locations {location}
  }
`

const Page = () => {

    const [roles, setRoles] = useState<string[]>([])
    const oidcState = useSelector((item: OidcStore) => item.oidc)
    const { loading, error, data } = useQuery(QUERY)

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

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {JSON.stringify(error)}</p>

    console.log('Page: roles ' + JSON.stringify(roles))

    if (roles.includes('admin')) {
        return (
            <div>
                <h1>This page is available for admins only</h1>
                <div>
                    Locations
                    <ul>
                        {data.locations.map(({ location }:any) => (
                            <li>{location}</li>
                        ))}
                    </ul>
                </div>
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
