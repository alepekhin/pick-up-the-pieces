# IdentityService HOWTO

We shall use [keycloak](https://www.keycloak.org/)

- docker run --name keycloak -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -d quay.io/keycloak/keycloak

This will start Keycloak exposed on the local port 8080. It will also create an initial admin user with username admin and password admin.

Next time you can start and stop the service as

- docker start keycloak
- docker stop keycloak

Admin console is available at http://localhost:8080/auth/admin



## How to add User and Client for Demo application

- create new realm `demo`
- get available endpoints at:

[http://localhost:8080/auth/realms/demo/.well-known/openid-configuration](http://localhost:8080/auth/realms/demo/.well-known/openid-configuration)

  
- create users:
```
  admin/admin, role admin
  guest/guest, role guest
```
- create client:
```
 name demo, redirect urls http://localhost:4000/* , http://localhost:3000/*
```



