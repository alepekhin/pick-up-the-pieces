import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'
import { setDevices, resetDevices, getDevices, addDevice, deleteDevice } from './DeviceSlice';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Devices = ({resetDevices, getDevices, setDevices, addDevice, deleteDevice}:any) => {

    const PAGESIZE = 20
    const store = useSelector((state: any) => state.device)
    const [filter, setFilter] = useState("")
    const [offset, setOffset] = useState(0)
    
    const [device, setDevice] = useState('') // new device to add

    useEffect(() => {
        getDevices({limit:PAGESIZE, offset:0, filter:""})
    },[getDevices])

    const handleDeviceChange = (e: any) => {
        setDevice(e.target.value)
    }

    function handleSubmitDevice(e: any) {
        var charCode = e.which || e.keyCode;
        if (charCode === 13) {
            addDevice({device: e.target.value})
        }
    }

    const handleFilterChange = (e: any) => {
        resetDevices([])
        const newFilter = e.target.value
        setFilter(newFilter)
        getDevices({limit:PAGESIZE, offset:0, filter:newFilter})
    }

    const handleDelete = (e: any) => {
        deleteDevice({device: e.device})
    }

    function fetchData() {
        const newOffset = offset + PAGESIZE
        setOffset(newOffset)
        getDevices({limit:PAGESIZE, offset:newOffset, filter:filter})
    }

    return (
        <div>
                <Link to="/logout">Logout</Link>

            <h1>Devices</h1>
            
            <TextField label="Filter Devices" value={filter} onChange={handleFilterChange} />
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
                            <Grid key={s.device} container>
                            <Grid item xs={8}>
                                {s.device}
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
            <TextField required label="New Device" value={device} onChange={handleDeviceChange} onKeyDown={handleSubmitDevice} />
            
        </div>
    )
}

export default connect(null, { resetDevices, getDevices, setDevices, addDevice, deleteDevice })(Devices)
