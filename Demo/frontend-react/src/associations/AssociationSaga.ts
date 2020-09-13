import { put, takeEvery } from 'redux-saga/effects'
import { AssociationQuery, AssociationData } from './AssociationStore'
import { PayloadAction } from '@reduxjs/toolkit'
import { setAssociations, getAssociations, addAssociation, deleteAssociation } from './AssociationSlice'
import { gql } from '@apollo/client'
import client from '..'

const GET_ASSOCIATIONS = gql`
  query GetAssociations($limit: Int, $offset: Int, $filter: String ) {
    associations(limit: $limit, offset: $offset, filter: $filter) {
      device,
      location
    }
  }
`

const ADD_ASSOCIATION = gql`
  mutation AddAssociation($device: String!, $location: String! ) {
    createAssociation(association:{device:$device, location:$location})
  }
`

const DELETE_ASSOCIATION = gql`
  mutation DeleteAssociation($association: AssociationInput! ) {
    deleteAssociation(association:$association)
  }
`

function* fetchNext(action: PayloadAction<AssociationQuery>) {
  const limit = action.payload.limit
  const offset = action.payload.offset
  const filter = action.payload.filter

  let result = yield client.query({
    query: GET_ASSOCIATIONS,
    variables: { limit: limit, offset: offset, filter: filter }
  })

  yield put(setAssociations(result.data.associations))

}

function* addNewAssociation(action: PayloadAction<AssociationData>) {
  console.log('adding association '+JSON.stringify(action.payload))
  yield client.mutate({
    mutation: ADD_ASSOCIATION,
    variables: action.payload
  })
  yield put(setAssociations([action.payload]))
}  

function* deleteAAssociation(action: PayloadAction<AssociationData>) {
  console.log('deleting association '+JSON.stringify(action.payload))
  yield client.mutate({
    mutation: DELETE_ASSOCIATION,
    variables: { association: action.payload }
  })
}  

export default function* AssociationSaga() {
  yield takeEvery(getAssociations, fetchNext)
  yield takeEvery(addAssociation, addNewAssociation)
  yield takeEvery(deleteAssociation, deleteAAssociation)
}

