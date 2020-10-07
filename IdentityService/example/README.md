# axios-oidc usage example

- with given request to backend endpoint get Authorization header
  and obtain jwt
- check jwt is valid obtaining userinfo
- if valid get user identity and roles
- apply results
- if jwt not valid or absent return 403

## How to run

- npm i
- npm start