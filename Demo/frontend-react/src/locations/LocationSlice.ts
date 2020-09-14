import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocationStore, LocationQuery, LocationData } from './LocationStore';

const LocationSlice = createSlice({
  name: 'location',
  initialState: [] as LocationStore,
  reducers: {
    resetLocations(state: LocationStore, action: any) {
      return []
    },
    getLocations(state: LocationStore, action: PayloadAction<LocationQuery>) {
      return state
    },
    addLocation(state: LocationStore, action: PayloadAction<LocationData>) {
      return state
    },
    deleteLocation(state: LocationStore, action: PayloadAction<LocationData>) {
      state = state.filter(item => item.location !== action.payload.location)
      return state
    },
    setLocations(state: LocationStore, action: PayloadAction<LocationData[]>) {
      action.payload.map(x => {
        const found = state.some(item => item.location === x.location);
        if (!found) {
          state.push(x)
        }
        return null
      })
      return state
    },
  }
})

export const { resetLocations, getLocations , setLocations, addLocation, deleteLocation } = LocationSlice.actions

export default LocationSlice.reducer