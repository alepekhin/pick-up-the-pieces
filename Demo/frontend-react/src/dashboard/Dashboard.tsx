import React  from 'react';
import { Typography, Grid } from '@material-ui/core';
import Device from '../devices/Device';
import Location from '../locations/Location';
import Association from '../associations/Association';
import { useSelector } from 'react-redux';
import { OidcStore } from '../oidc/OidcSlice';

const Dashboard = () => {

    const oidcState = useSelector((item: OidcStore) => item.oidc)

    if (oidcState.roles !== null && oidcState.roles.length > 0) {
        return (
            <div>
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
            <Typography>
                This page is available for registered users only
            </Typography>
        )
    }
}

export default Dashboard