import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import Device from '../devices/Device';
import Location from '../locations/Location';
import Association from '../associations/Association';
import { useSelector } from 'react-redux';
import { OidcStore } from '../oidc/OidcSlice';
import oidc, { Endpoint, Token } from 'oidc';
import { identityServiceURL, client_id } from '../App';

const Dashboard = () => {

    const [roles, setRoles] = useState<string[]>([])
    const oidcState = useSelector((item: OidcStore) => item.oidc)

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


    console.log('Page: roles ' + JSON.stringify(roles))

    if (roles.includes('admin')) {
        return (
            <div>
                <Typography>
                This page is available for registered users only
                </Typography>
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        <Device />
                    </Grid>
                    <Grid item xs={4}>
                        <Location />
                    </Grid>
                    <Grid item xs={4}>
                        <Association />
                    </Grid>
                </Grid>
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

export default Dashboard;