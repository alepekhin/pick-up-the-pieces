const { Provider } = require('oidc-provider');
const configuration = {
  claims: {
    openid: ['sub', 'email', 'name', 'roles']
  },
  async findAccount(ctx, id) {
    return {
      accountId: id,
      async claims(use, scope) { 
        return { 
          sub: id, 
          email: 'foo@bar.com', 
          email_verified: false,
          name: 'Foo Bar',
          roles: 'admin guest superuser'
        }; 
      },
    };
  },
  // ... see available options /docs
  clients: [{
    client_id: 'foo',
    client_secret: 'bar',
    redirect_uris: [
      'http://localhost:3000/oauth/callback'
    ],
    
    // + other client properties
  }]
};

const oidc = new Provider('http://localhost:4000', configuration);

// or just expose a server standalone, see /examples/standalone.js
const server = oidc.listen(4000, () => {
  console.log('oidc-provider listening on port 4000, check http://localhost:4000/.well-known/openid-configuration');
});