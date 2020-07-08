# Backend with ApolloServer

- npm install
- node src/index.js
- open browser at `http:localhost:4000`

Inside Playground:

QUERY ALL:
```
query Query {
  clients {client_id, client_secret, redirect_uris}
}
```


ADD CLIENT:
```
mutation($client: ClientInput!) {
 addClient(clientInput: $client) {
   success, message, client {client_id,client_secret}
 }
}

query variables:

{
  "client": {
  	"client_id": "foo2",
    "client_secret": "bar",
    "redirect_uris": ["http://localhost:3000/oauth/callback"]
  }
}

```

UPDATE CLIENT:
```
mutation($id: String!, $client: UpdateInput!) {
 updateClient(client_id: $id, updateInput: $client) {
   success, message, client {client_id,client_secret}
 }
}

query variables:

{
  "id": "foo2", 
  "client": {
    "client_secret": "bar2",
    "redirect_uris": ["http://localhost:3000/oauth/callback"]
  }
  
}

```


DELETE CLIENT:
```
mutation($id: String!) {
 deleteClient(client_id: $id) {
   success, message, client {client_id,client_secret}
 }
}

query variables:

{
  "id": "foo2"
  
}

```


Use code-gen for types generation from schema

- npm install @graphql-codegen/cli

- npx graphql-codegen init

add 
```
"generate": "graphql-codegen --config codegen.yml"
```
to package.json

- npm install

- npm run generate










