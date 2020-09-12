import { put, takeEvery, takeLatest } from 'redux-saga/effects'
import { DeviceQuery, DeviceData } from './DeviceStore'
import { PayloadAction } from '@reduxjs/toolkit'
import { setDevices, getDevices, addDevice, deleteDevice } from './DeviceSlice'
import { gql } from '@apollo/client'
import client from '..'

const GET_DEVICES = gql`
  query GetDevices($limit: Int, $offset: Int, $filter: String ) {
    devices(limit: $limit, offset: $offset, filter: $filter) {
      device
    }
  }
`

const ADD_DEVICE = gql`
  mutation AddDevice($device: String! ) {
    createDevice(device:{device:$device})
  }
`

const DELETE_DEVICE = gql`
  mutation DeleteDevice($device: String! ) {
    deleteDevice(device:$device)
  }
`

function* fetchNext(action: PayloadAction<DeviceQuery>) {
  const limit = action.payload.limit
  const offset = action.payload.offset
  const filter = action.payload.filter

  let result = yield client.query({
    query: GET_DEVICES,
    variables: { limit: limit, offset: offset, filter: filter }
  })

  yield put(setDevices(result.data.devices))

}

function* addNewDevice(action: PayloadAction<DeviceData>) {
  console.log('adding device '+JSON.stringify(action.payload))
  yield client.mutate({
    mutation: ADD_DEVICE,
    variables: { device: action.payload.device }
  })
  yield put(setDevices([action.payload]))
}  

function* deleteADevice(action: PayloadAction<DeviceData>) {
  console.log('deleting device '+JSON.stringify(action.payload))
  yield client.mutate({
    mutation: DELETE_DEVICE,
    variables: { device: action.payload.device }
  })
}  

export default function* DeviceSaga() {
  yield takeEvery(getDevices, fetchNext)
  yield takeEvery(addDevice, addNewDevice)
  yield takeEvery(deleteDevice, deleteADevice)
}

