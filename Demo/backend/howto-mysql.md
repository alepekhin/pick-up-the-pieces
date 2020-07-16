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
```
- create new database
```
create database demo;
use demo;
create table locations (location varchar(200) not null primary key);
create table devices (device varchar(200) not null primary key);
create table associations (location varchar(200) not null, device varchar(200) not null,
foreign key (location) references locations(location) on delete cascade on update cascade,
foreign key (device) references devices(device) on delete cascade on update cascade,
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

alter table locations 
```

Next user will be used in application:

```
CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
GRANT ALL PRIVILEGES ON *.* TO 'foo'@'%';
flush privileges;
```