# Express + Typescript

- npm init -y
- npm install express
- npm install @types/express
- npm install --save-dev typescript
- tsc --init // creates tsconfig.json
- edit tsconfig.json
```
"outDir": "./dist",                        /* Redirect output structure to the directory. */
```
- npm install --save-dev tslint
- npm install @types/node
- create tslint.json

```
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {
        "trailing-comma": [ false ]
        ,"no-console": false
    },
    "rulesDirectory": []
}
```
- edit package.json:
```
"main": "dist/index.js",
```

Template is ready!

Create src/index.ts 
```
import express from "express";
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
```

and start it:

```
npm start
``

server started at http://localhost:8080



