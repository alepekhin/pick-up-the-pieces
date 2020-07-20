import React from 'react'
import { useQuery, gql } from '@apollo/client';

const QUERY = gql`
  {
    locations {location}
  }
`

const Locations = () => {


    const { loading, error, data } = useQuery(QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            Locations
            <ul>
                {data.locations.map(({ location }) => (
                    <li>{location}</li>
                ))}
            </ul>
        </div>
    )
}

export default Locations