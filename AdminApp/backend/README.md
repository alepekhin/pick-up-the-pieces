# Backend with GraphQL API

- npm install
- node src/index.js
- open browser at `http:localhost:4000`

Inside Playground:

QUERY ALL:
```
query Query {
  clients { email }
}
```

QUERY BY ID:
```
query($id: String) {
 client(id: $id) {
   _id, email
 }
}

query variables:

{
  "id":"5ef9f8a1904efe3a055a1a17"
}
```

ADD CLIENT:
```
mutation($client: ClientInput!) {
 addClient(clientInput: $client) {
   success, message, client {_id,email}
 }
}

query variables:

{
  "client": {
  	"email": "myemail@dummy.com"
  }
  
}

```

UPDATE CLIENT:
```
mutation($email: String!, $client: UpdateInput!) {
 updateClient(email: $email, updateInput: $client) {
   success, message, client {_id,email,name}
 }
}

query variables:

{
  "email": "xxx@xxx2.com",
  "client": {
  	"name": "John Dough"
  }
}

```


DELETE CLIENT:
```
mutation($email: String!) {
 deleteClient(email: $email) {
   success, message, client {_id,email}
 }
}

query variables:

{
  "email": "myemail2345667@dummy.com"
}

```










