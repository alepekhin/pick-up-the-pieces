import oidc from './src/oidc'

const o = new oidc('http://localhost:8080/auth') // oidc endpoint

async function demo() {
    await o.init('demo')  // realm
    await o.getToken('demo-backend', 'admin', 'admin')
    await o.getUserInfo()
    console.log('userinfo ' + JSON.stringify(o.userInfo))
    console.log('isAuthenticated '+o.isAuthenticated())
    console.log('user roles '+o.getRoles(o.token.access_token))
    if (o.token != null) {
        const valid_token = o.token.access_token
        await o.isAccessTokenValid(valid_token)
        console.log('valid token valid '+o.isTokenValid)
        const invalid_token = o.token.access_token.replace('A','B')
        await o.isAccessTokenValid(invalid_token)
        console.log('invalid token valid '+o.isTokenValid)
    }
    public_resource()
    protected_resource()
    await o.getToken('demo-backend', 'user', 'user')
    await o.getUserInfo()
    console.log('userinfo ' + JSON.stringify(o.userInfo))
    console.log('isAuthenticated '+o.isAuthenticated())
    console.log('user roles '+o.getRoles(o.token.access_token))
    protected_resource()
}

demo()

const public_resource = () => {
    console.log('Inside public resource')
}

const protected_resource = () => {
    if (o.isAuthenticated && o.getRoles(o.token.access_token).includes('admin')) {
        console.log('Inside protected resource')
    } else {
        console.log('protected resource is unavailable')
    }
}

