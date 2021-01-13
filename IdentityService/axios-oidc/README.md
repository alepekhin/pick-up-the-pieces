# OIDC implementation with `axios`

While OAuth 2.0 is about resource access and sharing, OIDC is about user authentication. 
Its purpose is to give you one login for multiple sites. 

Implemented as local `npm` module

## How to build

- npm run build

## How to use in other application

- in app's `package.json` add
```
"oidc": "file:path_to_folder/axios-oidc"
```
- in program files add
```
import oidc from 'oidc'
```
- then create an instance with .well-known oidc address, known for every oidc provider

For keycloak it is `http://localhost:8080/auth`

For Google it is `https://accounts.google.com/.well-known/openid-configuration`

```
const o = new Oidc('http://localhost:8080/auth') // well-known oidc endpoint for keycloak

```
- in protected page check `await o.isAuthenticated()`
- if not redirect to login page `res.redirect(await o.getLoginURL(clientid, loginRedirectURL))`

where `loginRedirectURL` is redirect page defined at OIDC provider for given client

Inside this page get access token
```
await o.getAccessToken(clientid as string, clientsecret as string, req.query.code as string, loginRedirectURL)
```

Now you are authenticated and can go to protected resources

- You can check access token at any time by `o.isTokenValid()` that returns `true` | `false`


