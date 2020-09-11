import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'
import { setLocations, resetLocations, getLocations, addLocation, deleteLocation } from './LocationSlice';
import { connect, useSelector } from 'react-redux';

const Locations = ({resetLocations, getLocations, setLocations, addLocation, deleteLocation}:any) => {

    const PAGESIZE = 20
    const store = useSelector((state: any) => state.location)
    const [filter, setFilter] = useState("")
    const [offset, setOffset] = useState(0)
    
    const [location, setLocation] = useState('') // new location to add

    useEffect(() => {
        getLocations({limit:PAGESIZE, offset:0, filter:""})
    },[getLocations])

    const handleLocationChange = (e: any) => {
        setLocation(e.target.value)
    }

    function handleSubmitLocation(e: any) {
        var charCode = e.which || e.keyCode;
        if (charCode === 13) {
            addLocation({location: e.target.value})
        }
    }

    const handleFilterChange = (e: any) => {
        resetLocations([])
        const newFilter = e.target.value
        setFilter(newFilter)
        getLocations({limit:PAGESIZE, offset:0, filter:newFilter})
    }

    const handleDelete = (e: any) => {
        deleteLocation({location: e.location})
    }

    function fetchData() {
        const newOffset = offset + PAGESIZE
        setOffset(newOffset)
        getLocations({limit:PAGESIZE, offset:newOffset, filter:filter})
    }

    return (
        <div>

            <h1>Locations</h1>

            <TextField label="Filter Locations" value={filter} onChange={handleFilterChange} />
            <p />
            <div id="scr" style={{ height: "200px", width: "250px", overflowY: "scroll", overflowX: "hidden" }}>
            <InfiniteScroll
                dataLength={store.length}
                next={fetchData}
                hasMore={true}
                loader={<div></div>}
                scrollableTarget="scr">
                    {store.map((s: any) => {
                        return (
                            <Grid key={s.location} container>
                            <Grid item xs={8}>
                                {s.location}
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={() => handleDelete(s)}>Delete</Button>
                            </Grid>
                            </Grid>
                        )
                    })}
            </InfiniteScroll>
            </div>

            <p/>
            <TextField required label="New Location" value={location} onChange={handleLocationChange} onKeyDown={handleSubmitLocation} />
            
        </div>
    )
}

export default connect(null, { resetLocations, getLocations, setLocations, addLocation, deleteLocation })(Locations)
