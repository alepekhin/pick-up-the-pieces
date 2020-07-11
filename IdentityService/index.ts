import { app } from './src/provider';

const port = process.env.PORT;
const uri = process.env.OIDC_BASE_URI

// start the Express server
app.listen( port, () => {
  console.log(`oidc-provider listening on port ${port}, check ${uri}/.well-known/openid-configuration`);
} );