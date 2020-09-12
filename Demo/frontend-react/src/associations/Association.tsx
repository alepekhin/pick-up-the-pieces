import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'
import { setAssociations, resetAssociations, getAssociations, addAssociation, deleteAssociation } from './AssociationSlice';
import { connect, useSelector } from 'react-redux';

const Associations = ({resetAssociations, getAssociations, setAssociations, addAssociation, deleteAssociation}:any) => {

    const PAGESIZE = 20
    const store = useSelector((state: any) => state.association)
    const [filter, setFilter] = useState("")
    const [offset, setOffset] = useState(0)
    
    const [association, setAssociation] = useState({device:'', location:''})

    useEffect(() => {
        getAssociations({limit:PAGESIZE, offset:0, filter:""})
    },[getAssociations])

    const handleDeviceChange = (e: any) => {
        setAssociation({device: e.target.value, location: association.location})
    }

    const handleLocationChange = (e: any) => {
        setAssociation({location: e.target.value, device: association.device})
    }

    function handleSubmit() {
        console.log('handleSubmit '+JSON.stringify(association))
        addAssociation(association)
    }

    const handleFilterChange = (e: any) => {
        resetAssociations([])
        const newFilter = e.target.value
        setFilter(newFilter)
        getAssociations({limit:PAGESIZE, offset:0, filter:newFilter})
    }

    const handleDelete = (e: any) => {
        deleteAssociation({device: e.device, location: e.location})
    }

    function fetchData() {
        const newOffset = offset + PAGESIZE
        setOffset(newOffset)
        getAssociations({limit:PAGESIZE, offset:newOffset, filter:filter})
    }

    return (
        <div>

            <h1>Associations</h1>

            <TextField label="Filter Associations" value={filter} onChange={handleFilterChange} />
            <p />
            <div id="scr" style={{ height: "200px", width: "450px", overflowY: "scroll", overflowX: "hidden" }}>
            <InfiniteScroll
                dataLength={store.length}
                next={fetchData}
                hasMore={true}
                loader={<div></div>}
                scrollableTarget="scr">
                    {store.map((s: any) => {
                        return (
                            <Grid key={s.device+s.location} container>
                            <Grid item xs={4}>
                                {s.device}
                            </Grid>
                            <Grid item xs={4}>
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
            New Association
            <p/>
            <TextField required label="Device" value={association.device} onChange={handleDeviceChange} />
            <p/>
            <TextField required label="Location" value={association.location} onChange={handleLocationChange} />
            <p/>
            <Button onClick={() => handleSubmit()}>Submit</Button>
            
        </div>
    )
}

export default connect(null, { resetAssociations, getAssociations, setAssociations, addAssociation, deleteAssociation })(Associations)
