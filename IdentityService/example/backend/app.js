/*
 * JBoss, Home of Professional Open Source
 * Copyright 2016, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var Keycloak = require('keycloak-connect');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());

// Enable CORS support
app.use(cors({origin:'*'}));

// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Provide the session store to the Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
//
// Additional configuration is read from keycloak.json file
// installed from the Keycloak web console.

var keycloak = new Keycloak({
  store: memoryStore
});

app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/'
}));

app.get('/service/public', function (req, res) {
  res.json({message: 'public'});
});

app.get('/service/secured', keycloak.protect('realm:admin'), function (req, res) {
  res.json({message: 'secured'});
});

app.get('/service/admin', keycloak.protect('realm:admin'), function (req, res) {
  demo(req)
  res.json({message: 'admin'});
});

app.use('*', function (req, res) {
  res.send('Not found!');
});

app.listen(4000, function () {
  console.log('Started at port 4000');
});

function extractJwt(headers) {
  if (headers && !headers.authorization) {
    throw new UnauthorizedException();
  }

  const auth = headers.authorization.split(' ');

  // We only allow bearer
  if (auth[0].toLowerCase() !== 'bearer') {
    throw new UnauthorizedException();
  }

  return auth[1];
}

async function demo(req) {
  console.log('>>> req headers '+JSON.stringify(req.headers))
  let jwt = extractJwt(req.headers)
  console.log('>>> req jwt '+jwt)
  let info = await keycloak.grantManager.userInfo(jwt)
  console.log('>>> userInfo '+JSON.stringify(info))
  let result = await keycloak.grantManager.validateAccessToken(jwt)
  console.log('>>> result '+JSON.stringify(result))
  //keycloak.grantManager

}