# OIDC identity service 

The simplest identity service with preconfigured client

It shows how to provide client roles along with authentication

These roles will be available as user info in the client app

See client app in `ClientExample`

## How to run

- create file `.env` and define
```
PORT=4000 
OIDC_BASE_URI=http://localhost
```
- npm install
- npm start

OIDC provider will be available at `http://localhost:4000/oidc`

Open `http://localhost:4000/oidc/.well-known/openid-configuration` to see issuer

## Additional resources

https://connect2id.com/learn/openid-connect

https://github.com/panva/node-oidc-provider