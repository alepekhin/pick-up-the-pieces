/*
  Autentication with OpenID Connect
*/

import axios, { AxiosRequestConfig } from 'axios'
import querystring from 'querystring'

export interface Endpoint {
  token_endpoint: string
  authorization_endpoint: string
  userinfo_endpoint: string
  end_session_endpoint: string
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
  id_token?: string
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

export interface OidcState {
  endpoint: Endpoint | null
  token: Token | null
  userInfo: UserInfo | null
}

export default class Oidc {

  endpoint: Endpoint | null = null
  token: Token  = {access_token: ''}
  userInfo: UserInfo | null = null

  constructor(private url: string) {}

  async init() {
    if (this.endpoint === null) {
      const config: AxiosRequestConfig = {
        method: 'get',
        url: this.url
      }
      await axios(config)
      .then((response) => {
        this.endpoint = {
          token_endpoint: response.data.token_endpoint,
          authorization_endpoint: response.data.authorization_endpoint,
          userinfo_endpoint: response.data.userinfo_endpoint,
          end_session_endpoint: response.data.end_session_endpoint
        }
        if (response.data.end_session_endpoint) {
          // keycloak
          this.endpoint.end_session_endpoint = response.data.end_session_endpoint
        } else {
          // google
          this.endpoint.end_session_endpoint = response.data.revocation_endpoint
        }
      })
      .catch((error) => {
        throw Error(error);
      })
    }
  }

  async getLoginURL(clientid:string, redirecturi:string) {
    await this.init()
    const scope = 'openid profile email'
    return `${this.endpoint?.authorization_endpoint}?client_id=${clientid}&redirect_uri=${redirecturi}&response_type=code&scope=${scope}`
  }

  // Authorization Flow Grant
  async getAccessToken(clientid: string, clientsecret: string, code: string, redirecturi: string ) {
    await this.init()
    const params = {
      'client_id': clientid,
      'client_secret': clientsecret,
      'code': code,
      'redirect_uri': redirecturi,
      'grant_type': 'authorization_code'
    }

    const config: AxiosRequestConfig = {
      method: 'post',
      url: this.endpoint?.token_endpoint,
      data: querystring.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    await axios(config)
      .then((response) => {
        this.token = {
          access_token: response.data.access_token,
          id_token: response.data.id_token,
          expires_in: response.data.expires_in,
          refresh_expires: response.data.refresh_expires,
          refresh_token: response.data.refresh_token,
          session_state: response.data.session_state,
          scope: response.data.scope,
          token_type: response.data.token_type,
          "not-before-policy": response.data['not-before-policy']
        }
      })
      .catch((error) => {
        // console.log(error)
        throw Error(error);
      })
  }

  /*
  Returns userInfo and can be used for token validation
  */
  async getUserInfo() {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: this.endpoint?.userinfo_endpoint,
      headers: {
        'Authorization': 'Bearer '+this.token.access_token
      }
    }
    await axios(config)
      .then((response) => {
        this.userInfo = {
          sub: response.data.sub,
          name: response.data.name,
          preferred_username: response.data.preferred_username,
          email: response.data.email,
        }
      })
      .catch((error) => {
        this.userInfo = null
      })
  }

  async isAuthenticated() {
    await this.getUserInfo()
    return !(this.userInfo === null)
  }

  logout() {
    // clear state
    this.token = {access_token: ''}
    this.userInfo = null
  }

}