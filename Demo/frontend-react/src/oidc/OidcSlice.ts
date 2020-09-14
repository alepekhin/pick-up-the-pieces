import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Endpoint, Token, OidcState, UserInfo } from 'oidc';

const initialState = {
  endpoint: null, 
  token: null, 
  roles: null, 
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
    setRoles(state:OidcState, action:PayloadAction<string[]>) {
      state.roles = action.payload
      return state
    },
    setUserInfo(state:OidcState, action:PayloadAction<UserInfo>) {
      state.userInfo = action.payload
      return state
    },
    clearState(state:OidcState, action:PayloadAction<void>) {
      state = {
        endpoint: null, 
        token: null, 
        roles: null, 
        userInfo: null
      } as OidcState
      return state
    },
  }
})

export const { setEndpoint, setToken, setRoles, setUserInfo, clearState } = oidcSlice.actions

export default oidcSlice.reducer
