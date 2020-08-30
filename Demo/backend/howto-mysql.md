# How to install MySql 

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

- create new database

mysql>create database demo;


Next user will be used in application:

```
CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
GRANT ALL PRIVILEGES ON *.* TO 'foo'@'%';
flush privileges;
```

Tables in demo database will be created with sample data
when we run `npm run test:e2e` in the backend

