import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Endpoint, Token, OidcState } from 'oidc';

const initialState = {
  endpoint: null, 
  token: null, 
  userInfo: null
} as OidcState

export type OidcStore = {
  oidc: OidcState
}

const oidcSlice = createSlice({
  name: 'oidc',
  initialState: initialState,
  reducers: {
    setEndpoint(state:OidcState, action:PayloadAction<Endpoint>) {
      state.endpoint = action.payload
      return state
    },
    setToken(state:OidcState, action:PayloadAction<Token>) {
      state.token = action.payload
      return state
    },
  }
})

export const { setEndpoint, setToken } = oidcSlice.actions

export default oidcSlice.reducer
