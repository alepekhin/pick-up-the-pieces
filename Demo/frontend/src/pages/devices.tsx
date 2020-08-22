import React from 'react'
import { useQuery, gql } from '@apollo/client'

const QUERY = gql`
  {
    devices {device}
  }
`

const Devices = () => {


    const { loading, error, data } = useQuery(QUERY)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return (
        <div>
            Devices
            <ul>
                {data.devices.map(({ device }) => (
                    <li>{device}</li>
                ))}
            </ul>
        </div>
    )
}

export default Devices