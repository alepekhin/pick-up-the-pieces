import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import session from 'express-session';
//var bodyParser = require('body-parser');
import Keycloak from 'keycloak-connect';
//import helmet from 'helmet'
//import cookieParser = require('cookie-parser')

const defaultPort = 4000
const port = process.env.PORT || defaultPort

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
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
  app.enableCors({ origin: '*' })
  await app.listen(port, () =>
    console.log(`🚀 App listening on the port ${port}`),
  )
  let url = await app.getUrl()
  console.log('application url '+url)
}

void bootstrap()
