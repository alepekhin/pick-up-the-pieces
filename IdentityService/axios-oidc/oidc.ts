import axios, { AxiosRequestConfig } from 'axios'
import querystring from 'querystring'
import {Request,Response} from "express";

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

  constructor(private url: string) { }

  async init(realm: string) {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: this.url + '/realms/' + realm + '/.well-known/openid-configuration'
    }
    await axios(config)
      .then((response) => {
        this.endpoint = {
          token_endpoint: response.data.token_endpoint,
          authorization_endpoint: response.data.authorization_endpoint,
          end_session_endpoint: response.data.end_session_endpoint,
          userinfo_endpoint: response.data.userinfo_endpoint,
          introspection_endpoint: response.data.introspection_endpoint
        }
      })
      .catch((error) => {
        throw Error(error);
      })
  }

  // Direct Access Grant
  async getToken(client_id: string, username: string, password: string) {
    if (this.endpoint == null) {
      throw new Error('oidc not initialized')
    }
    const params = {
      'client_id': client_id,
      'username': username,
      'password': password,
      'grant_type': 'password'
    }

    const config: AxiosRequestConfig = {
      method: 'post',
      url: this.endpoint.token_endpoint,
      data: querystring.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    await axios(config)
      .then((response) => {
        this.token = {
          access_token: response.data.access_token,
          expires_in: response.data.expires_in,
          refresh_expires: response.data.refresh_expires,
          refresh_token: response.data.refresh_token,
          session_state: response.data.session_state,
          scope: response.data.scope,
          token_type: response.data.token_type,
          "not-before-policy": response.data['not-before-policy'],
        }
        this.client_id = client_id
      })
      .catch((error) => {
        throw Error(error);
      })
  }

  // Authorization Flow Grant
  async getTokenAuth(client_id: string, code: string, redirect_uri: string ) {
    if (this.endpoint == null) {
      throw new Error('oidc not initialized')
    }
    const params = {
      'client_id': client_id,
      'code': code,
      'redirect_uri': redirect_uri,
      'grant_type': 'authorization_code'
    }

    const config: AxiosRequestConfig = {
      method: 'post',
      url: this.endpoint.token_endpoint,
      data: querystring.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    await axios(config)
      .then((response) => {
        this.token = {
          access_token: response.data.access_token,
          expires_in: response.data.expires_in,
          refresh_expires: response.data.refresh_expires,
          refresh_token: response.data.refresh_token,
          session_state: response.data.session_state,
          scope: response.data.scope,
          token_type: response.data.token_type,
          "not-before-policy": response.data['not-before-policy'],
        }
        this.client_id = client_id
      })
      .catch((error) => {
        console.log(error)
        throw Error(error);
      })
  }

  async getUserInfo(access_token: string) {
    if (this.endpoint == null || this.token == null) {
      throw new Error('oidc not initialized')
    }

    const config: AxiosRequestConfig = {
      method: 'get',
      url: this.endpoint.userinfo_endpoint,
      headers: {
        'Authorization': 'bearer '+access_token
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
        throw Error(error);
      })
  }

  isAuthenticated() {
    return this.token != null
  }

  getRoles(access_token: string) {
    if (this.client_id == null) {
      throw Error('client_id not defined')
    }
    const token: Token = {
      access_token
    }
    const accessToken = JSON.parse(
      Buffer.from(JSON.stringify(token).split('.')[1], 'base64').toString()
    )
    const roles: string[] = accessToken.resource_access[this.client_id].roles
    return roles
  }

  async isAccessTokenValid(access_token: string) {
    if (this.endpoint == null) {
      throw new Error('oidc not initialized')
    }

    const config: AxiosRequestConfig = {
      method: 'get',
      url: this.endpoint.userinfo_endpoint,
      headers: {
        'Authorization': 'bearer '+access_token
      }
    }
    await axios(config)
      .then((response) => {
        this.isTokenValid = true
      })
      .catch((error) => {
        console.log(error)
        this.isTokenValid = false
      })
  }

  // does not work, error: 'No refresh token'
  async logout(access_token: string, redirect_uri: string) {
    if (this.endpoint == null) {
      throw new Error('oidc not initialized')
    }

    const params = {
      'client_id': this.client_id,
      'redirect_uri': redirect_uri,
      'reresh_token': this.token.refresh_token
    }
    console.log('logout refresh_token:'+this.token.refresh_token)

    const config: AxiosRequestConfig = {
      method: 'post',
      url: this.endpoint.end_session_endpoint,
      data: querystring.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer '+access_token
      }
    }
    await axios(config)
      .then((response) => {
        console.log('logout success')
      })
      .catch((error) => {
        console.log(error)
        this.isTokenValid = false
      })
  }

  /*
  Method working for express app, assuming in caller code
  
  import express,{Request,Response} from "express";
  import cookieParser from 'cookie-parser';
  
  const app = express();
  app.use(cookieParser())
  
  */
  isAuthorized = async (req:Request, res:Response, url:string, role?:string) => {
    let access_token = ''
    if (req.cookies.token) { // check if cookie present
        access_token = req.cookies.token
    } else if (req.headers.authorization) { // check if header present
        const auth = req.headers.authorization
        if (auth.startsWith('bearer')) {
            access_token = auth.replace('bearer ','')
        }
    } else if(req.query.code) { // check code
        await this.getTokenAuth(this.client_id as string, req.query.code as string, url)
        access_token = this.token.access_token;
    } else {
        console.log('redirecting...')
        res.redirect(this.endpoint?.authorization_endpoint+'?client_id='+this.client_id+'&redirect_uri='+url+'&response_type=code&scope=openid');
    }
    if (access_token) {
        const roles =  this.getRoles(access_token)
        if (role) {
            if (roles.includes(role)) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    } else {
        return false
    }
  }

}