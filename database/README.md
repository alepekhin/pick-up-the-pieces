# Database

We shall use MongoDB - a popular, document-oriented NoSQL database

Assuming `docker` is installed:

- create directory with database data:
  ```
  mkdir -p ~/mongodata
  ```

- docker pull mongo
- docker run -it -v /data/db:\`ls -d ~/mongodata\` --name mongodb -d mongo
- docker ps

Nice, we see that container is running.

Now we can obtain mongodb shell:

- docker exec -it mongodb bash
- type `mongo` after the bash prompt

Cool, we are inside mongodb shell and can manage the database.



