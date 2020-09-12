import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Device from '../devices/Device';
import Location from '../locations/Location';
import Association from '../associations/Association';

const Dashboard = () => {
    return (
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
    );
}

export default Dashboard;