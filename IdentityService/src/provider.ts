import express from "express";
import { Provider } from 'oidc-provider';
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.PORT || !process.env.OIDC_BASE_URI) {
  throw new Error('Environment not set');
}

export const app = express();

const configuration = {
  claims: {
    openid: ['sub', 'email', 'name', 'roles']
  },
  async findAccount(ctx:any, id:any) {
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
      },
    };
  },
  // ... see available options /docs
  clients: [{
    client_id: 'foo',
    client_secret: 'bar',
    redirect_uris: [
      'http://localhost:3000/oauth/callback'
    ],

    // + other client properties
  }]
};

const prefix = '/oidc';
const uri = process.env.OIDC_BASE_URI +':'+process.env.PORT+prefix

export const oidc = new Provider(uri, configuration);

// assumes express ^4.0.0
app.use(prefix, oidc.callback);


