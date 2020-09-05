# Backend: Nest, GraphQL, MySql

## How to run

- install and run MySql, see [this howto-mysql](howto-mysql.md)
- install and run keycloak, see [this howto-keycloak](howto-keycloak.md) 

If they are installed start them as

- docker start mysql
- docker start keycloak

Then execute 

- npm start

## How to test

There 2 kinds of tests here - unit tests and e2e tests   
Unit tests do not require mysql and executed with sqlite3   
e2e tests run with mysql and create tables and sample data

- npm test

will run unit tests

- npm run test:e2e

will run e2e tests

Test's code is in the folder `src/test`    
I don't like polluting the main code with tests

## Playground

mutation {
  createDevice(device:{device:"xxx"})
}

query {
  devices(limit:5, filter:"xxx") {device}
}

query {
  device(id:"xxx") {device}
}

mutation {
  deleteDevice(device:"xxx")
}










