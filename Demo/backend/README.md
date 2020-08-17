# Backend: Nest, GraphQL, MySql

## Prerequisits

- install and run MySql, see [this howto-mysql](howto-mysql.md)
- install and run keycloak, see [this howto-keycloak](howto-keycloak.md) 

If they are installed start them as

- docker start mysql
- docker start keycloak

Then execute 

- npm start

It works without keycloak.
With KeycloakModule we get

```
[Nest] 11679   - 08/10/2020, 1:59:11 PM   [ExceptionsHandler] Cannot read property 'cookies' of undefined +7919ms
TypeError: Cannot read property 'cookies' of undefined
    at AuthGuard.<anonymous> (/home/alepekhin/Me/pick-up-the-pieces/Demo/backend/node_modules/nest-keycloak-connect/guards/auth.guard.js:55:65)
    at Generator.next (<anonymous>)
    at /home/alepekhin/Me/pick-up-the-pieces/Demo/backend/node_modules/nest-keycloak-connect/guards/auth.guard.js:20:71
    at new Promise (<anonymous>)
```

How to solve it?

- First read https://docs.nestjs.com/techniques/security
  and add Helmet `

- npm i --save helmet
- npm i --save @types/helmet

Does not help. Then install

- npm install --save cookie-parser
- npm install --save @types/cookie-parser

Now it does not show errors but hangs.







