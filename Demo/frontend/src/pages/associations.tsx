import React from 'react'
import { useQuery, gql } from '@apollo/client'

const QUERY = gql`
  {
    associations {location, device}
  }
`

const Associations = () => {


    const { loading, error, data } = useQuery(QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            Associations
            <ul>
                {data.associations.map(({ location, device }) => (
                    <li>{location} - {device}</li> 
                ))}
            </ul>
        </div>
    )
}

export default Associations