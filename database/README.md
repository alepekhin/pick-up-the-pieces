# Database

We shall use MongoDB - a popular, document-oriented NoSQL database

Assuming `docker` is installed:

- create directory with database data:
  ```
  mkdir -p ~/mongodata
  ```

- docker pull mongo
- docker run -p 27017:27017 -it -v \`ls -d ~/mongodata\`:/data/db: --name mongodb -d mongo

This command create container named `mongodb`

- docker ps

Nice, we see that container is running.

Now we can obtain mongodb shell:

- docker exec -it mongodb bash
- type `mongo` after the bash prompt

Cool, we are inside mongodb shell and can manage the database.

When finished - stop container
```
docker stop mongodb
```

Next time you can start container again:
```
docker start mongodb
```

Some usefull commands:
```
show dbs
use <db_name>
show collections
db.<collection_name>.find()
```

The free UI tool for mongodb:

`https://www.mongodb.com/try/download/compass`


After installing enter the new connection as

`mongodb://localhost:27017`


## Add the first user to the database

use admin
db.createUser(
  {
    user: "sysadm2",
    pwd: "sysadm2",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)





