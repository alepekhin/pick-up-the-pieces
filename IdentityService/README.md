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

## Testing the client

- create client `demo-backend`
- set `Redirect URL` to `http://localhost:3000/*`
- set `Web origins` to `*`
- add roles to client `admin` and `user`
- create users `admin` and `user` with passwords `admin` and `user` correspondingly
- for each user in `Role mapping` tab select `Client Roles` as `demo-backend` and assing role `admin` to user `admin` and role `user` to user `user`
- in client tab go to `Role Mappers` and add built-in 
- username
- realm-roles
- client-roles
- profile



Test client:


```curl  -d "client_id=demo-backend" -d "username=admin" -d "password=admin" -d "grant_type=password" "http://localhost:8080/auth/realms/demo/protocol/openid-connect/token"

```

the output is JWT token:
```
{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJXVWtSa2F4ZXFaZjFRX3FZOGR5c2dSX3NDa2c5Z2N1UnJpZS01YTRFT1pjIn0.eyJleHAiOjE1OTc1NjE5NTQsImlhdCI6MTU5NzU2MTY1NCwianRpIjoiM2ViYmY1YWMtNTA5MS00YTA1LWFlNmMtZThlYzI3YmIxYTczIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL2RlbW8iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiOGVmNTU3MzgtYTAyMC00ZmQ5LWJjMDItMTZkNjZhNTVhZTI0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGVtby1iYWNrZW5kIiwic2Vzc2lvbl9zdGF0ZSI6IjFjYmNmMTE2LTBiNjEtNDU1OS04YzAxLTM5MjY2Y2MwZjFmNSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiYWRtaW4iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.Ao7YKSt4u5Ay-cFbb80dafDXNkXwf7M0ws2-GDQ4t8o3aY2JGIFs-Phvsqw-RH5J3Fv3GlHGWm5RQcfVV3UEuXw5Fi95k7l3CK6vhyY0-ow0vwK1ax9dxrqNCysO2JQBwsCemqA9RtP35mb8ZsCjkctjAXZdqmHqvzcnA3Km5GK6-2LIk-vh4HhsC0R6_iQx492WdQYzP24B2TNKmZm4qkt5EFIJs8fV2bTQJhnrVi9xMGvov7floUoY9rnPm4QoCNszFQs3YJYWtRVprbPHxUmj8IsPfdgPveVuXSbPhTxdpUdoH4focZBuGOKx6iOwXd6bQaP7b368iYo5SdwhVg","expires_in":300,"refresh_expires_in":1800,"refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2ODBhZjU2OS04ZTlmLTRmNDUtOGZhMS1hYWNkNTE3ZjcwYjMifQ.eyJleHAiOjE1OTc1NjM0NTQsImlhdCI6MTU5NzU2MTY1NCwianRpIjoiNzllZjkxY2EtMGQ0NS00NzFjLWIzNTQtMGNlYTU5MmJhYzdmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL2RlbW8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvZGVtbyIsInN1YiI6IjhlZjU1NzM4LWEwMjAtNGZkOS1iYzAyLTE2ZDY2YTU1YWUyNCIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJkZW1vLWJhY2tlbmQiLCJzZXNzaW9uX3N0YXRlIjoiMWNiY2YxMTYtMGI2MS00NTU5LThjMDEtMzkyNjZjYzBmMWY1Iiwic2NvcGUiOiJlbWFpbCBwcm9maWxlIn0.4cyftkMV0oQTkw6mdxZQJZg3Gb5Y-7uPITMeXP_BbmM","token_type":"bearer","not-before-policy":0,"session_state":"1cbcf116-0b61-4559-8c01-39266cc0f1f5","scope":"email profile"}
```


The folder "example" contains working example with authentication with keycloak or google
(uncomment desired)

- npm i
- npm start


Here’s a list of OIDC endpoints that the Keycloak publishes. These URLs are useful if you are using a non-Keycloak client adapter to talk OIDC with the auth server. These are all relative URLs and the root of the URL being the HTTP(S) protocol, hostname, and usually path prefixed with /auth: i.e. https://localhost:8080/auth

`/realms/{realm-name}/protocol/openid-connect/token`
This is the URL endpoint for obtaining a temporary code in the Authorization Code Flow or for obtaining tokens via the Implicit Flow, Direct Grants, or Client Grants.

`/realms/{realm-name}/protocol/openid-connect/auth`
This is the URL endpoint for the Authorization Code Flow to turn a temporary code into a token.

`/realms/{realm-name}/protocol/openid-connect/logout`
This is the URL endpoint for performing logouts.

`/realms/{realm-name}/protocol/openid-connect/userinfo`
This is the URL endpoint for the User Info service described in the OIDC specification.


  
  

