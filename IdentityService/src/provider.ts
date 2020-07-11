import express from "express";
import { Provider, ResponseType } from 'oidc-provider';
import dotenv from 'dotenv'
import { createBrotliCompress } from "zlib";

dotenv.config()

if (!process.env.PORT || !process.env.OIDC_BASE_URI) {
  throw new Error('Environment not set');
}

export const app = express();

const clients = [
  {
    client_id: 'foo',
    client_secret: 'ss',
    redirect_uris: [
      'http://localhost:3000/oauth/callback'
    ],
    post_logout_redirect_uris: [
      'http://localhost:3000'
    ]
  }

]

const findAccount = async (ctx:any, id:any) => {
  if (id == 'foo')
  return {
    accountId: id,
    async claims(use:any, scope:any) {
      return {
        sub: id,
        email: 'foo@bar.com',
        email_verified: false,
        name: 'Foo Bar',
        roles: 'admin guest superuser'
      };
    }
  }
  else throw new Error('Account not found');
}

const claims =  {
  openid: ['sub', 'email', 'name', 'roles']
}

const find = async () => {
  console.log('find client called')
}

const configuration = {
  features: {
    registration: {
      enabled: true,
    },
    sessionManagement: {
      enabled: true,
    }
  },
  claims,
  findAccount,
  clients,
  // find
  // ... see available options /docs

};

const prefix = '/oidc';
const uri = process.env.OIDC_BASE_URI +':'+process.env.PORT+prefix

export const oidc = new Provider(uri, configuration);

// assumes express ^4.0.0
app.use(prefix, oidc.callback);


