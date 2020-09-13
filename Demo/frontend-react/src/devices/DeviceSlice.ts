import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DeviceStore, DeviceQuery, DeviceData } from './DeviceStore';

const DeviceSlice = createSlice({
  name: 'device',
  initialState: [] as DeviceStore,
  reducers: {
    resetDevices(state: DeviceStore, action: any) {
      return []
    },
    getDevices(state: DeviceStore, action: PayloadAction<DeviceQuery>) {
      return state
    },
    addDevice(state: DeviceStore, action: PayloadAction<DeviceData>) {
      return state
    },
    deleteDevice(state: DeviceStore, action: PayloadAction<DeviceData>) {
      state = state.filter(item => item.device !== action.payload.device)
      return state
    },
    setDevices(state: DeviceStore, action: PayloadAction<DeviceData[]>) {
      action.payload.map(x => {
        state.push(x)
        return null
      })
      return state
    },
  }
})

export const { resetDevices, getDevices , setDevices, addDevice, deleteDevice } = DeviceSlice.actions

export default DeviceSlice.reducer