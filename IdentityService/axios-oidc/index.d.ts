declare module 'oidc' {

    export interface Endpoint {
        token_endpoint: string
        authorization_endpoint: string
        end_session_endpoint: string
        userinfo_endpoint: string
        introspection_endpoint: string
      }
      
      /*
      We can get access_token from incoming request
      with all other fields in token after Direct Access Grant
      or get it from Authorization: bearer access_token
      or from cookie
      Note: we can not add Authorization header when redirect
      - we can add cookie only!
      */
      export interface Token {
        access_token: string
        expires_in?: number
        refresh_expires?: number
        refresh_token?: string
        token_type?: string
        'not-before-policy'?: number
        session_state?: string
        scope?: string
      }
      
      export interface UserInfo {
        sub: string
        name: string
        preferred_username: string
        email: string
      }

export default class oidc {

    endpoint: Endpoint | null = null
    token: Token  = {access_token: ''}
    userInfo: UserInfo | null = null
    client_id: string | null = null
    isTokenValid: boolean = false
  
    constructor(host)
    init(realm: string)
    isAuthenticated()
    getToken(client_id: string, username: string, password: string)
    getTokenAuth(client_id: string, code: string, redirect_uri: string )
    getUserInfo(access_token: string)
    isAccessTokenValid(access_token: string)
    getRoles(access_token: string)
    logout(access_token: string, redirect_uri: string)
    isAuthorized
}

//export = oidc

}
