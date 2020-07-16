# Backend with ApolloServer

## Prerequisites

Install MySql 

- create folder `~/mysqldata`
- Start mysql container like this:
```
docker run --name mysql -p 3306:3306 -v `ls -d ~/mysqldata`:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql
```
- next time you can start and stop container as
```
docker stop mysql
docker start mysql
```
- install mysql client in your OS and get access to the database:
```
mysql --host=127.0.0.1 --user=root --password
Enter password: root
mysql>
```
- create new database
```
create database demo;
use demo;
create table locations (location varchar(200) not null primary key);
create table devices (device varchar(200) not null primary key);
create table associations (location varchar(200) not null, device varchar(200) not null,
foreign key (location) references locations(location),
foreign key (device) references devices(device),
primary key (location, device)
);
insert into locations values ('table');
insert into locations values ('ceiling');
insert into devices values ('my computer');
insert into devices values ('chandelier');
insert into devices values ('table-lamp');
insert into associations(location, device) values ('table','my computer');
insert into associations(location, device) values ('table','table-lamp');
insert into associations(location, device) values ('ceiling','chandelier');
commit;
```

## Start the project

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










