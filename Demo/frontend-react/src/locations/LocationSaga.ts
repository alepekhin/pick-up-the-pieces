import { put, takeEvery } from 'redux-saga/effects'
import { LocationQuery, LocationData } from './LocationStore'
import { PayloadAction } from '@reduxjs/toolkit'
import { setLocations, getLocations, addLocation, deleteLocation } from './LocationSlice'
import { gql } from '@apollo/client'
import client from '..'

const GET_LOCATIONS = gql`
  query GetLocations($limit: Int, $offset: Int, $filter: String ) {
    locations(limit: $limit, offset: $offset, filter: $filter) {
      location
    }
  }
`

const ADD_LOCATION = gql`
  mutation AddLocation($location: String! ) {
    createLocation(location:{location:$location})
  }
`

const DELETE_LOCATION = gql`
  mutation DeleteLocation($location: String! ) {
    deleteLocation(location:$location)
  }
`

function* fetchNext(action: PayloadAction<LocationQuery>) {
  const limit = action.payload.limit
  const offset = action.payload.offset
  const filter = action.payload.filter

  let result = yield client.query({
    query: GET_LOCATIONS,
    variables: { limit: limit, offset: offset, filter: filter }
  })

  yield put(setLocations(result.data.locations))

}

function* addNewLocation(action: PayloadAction<LocationData>) {
  console.log('adding location '+JSON.stringify(action.payload))
  yield client.mutate({
    mutation: ADD_LOCATION,
    variables: { location: action.payload.location }
  })
  yield put(setLocations([action.payload]))
}  

function* deleteALocation(action: PayloadAction<LocationData>) {
  console.log('deleting location '+JSON.stringify(action.payload))
  yield client.mutate({
    mutation: DELETE_LOCATION,
    variables: { location: action.payload.location }
  })
}  

export default function* LocationSaga() {
  yield takeEvery(getLocations, fetchNext)
  yield takeEvery(addLocation, addNewLocation)
  yield takeEvery(deleteLocation, deleteALocation)
}

