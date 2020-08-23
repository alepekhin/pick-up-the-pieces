# OIDC implementation with `axios`

Implemented as local `npm` module

## How to build

- npm run build

## How to use in other application

- in app's `package.json` add
```
"oidc": "file:path_to_folder/axios-oidc"
```
- in program files add
```
import oidc from 'oidc'
```
- then create an instance
```
const o = new oidc('http://localhost:8080/auth') // oidc endpoint
```
- and use API

