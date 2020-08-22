import oidc from './src/oidc'
import express from "express";
import hbs from 'express-handlebars';
import cookieParser from 'cookie-parser';

const o = new oidc('http://localhost:8080/auth') // oidc endpoint
const client_id = 'demo-backend'

async function demo() {
    await o.init('demo')  // realm
    await o.getToken(client_id, 'admin', 'admin')
    let access_token = o.token.access_token
    await o.getUserInfo(access_token)
    console.log('userinfo ' + JSON.stringify(o.userInfo))
    console.log('isAuthenticated ' + o.isAuthenticated())
    console.log('user roles ' + o.getRoles(access_token))
    if (o.token != null) {
        const valid_token = o.token.access_token
        await o.isAccessTokenValid(valid_token)
        console.log('valid token valid ' + o.isTokenValid)
        const invalid_token = o.token.access_token.replace('A', 'B')
        await o.isAccessTokenValid(invalid_token)
        console.log('invalid token valid ' + o.isTokenValid)
    }
    public_resource()
    protected_resource()
    await o.getToken(client_id, 'user', 'user')
    access_token = o.token.access_token
    await o.getUserInfo(access_token)
    console.log('userinfo ' + JSON.stringify(o.userInfo))
    console.log('isAuthenticated ' + o.isAuthenticated())
    console.log('user roles ' + o.getRoles(access_token))
    protected_resource()
    console.log('get token for dummy user')
    try {
        await o.getToken(client_id, 'guest', 'guest')
        access_token = o.token.access_token
        await o.getUserInfo(access_token)
        console.log('userinfo ' + JSON.stringify(o.userInfo))
        console.log('isAuthenticated ' + o.isAuthenticated())
        console.log('user roles ' + o.getRoles(access_token))
        protected_resource()
    } catch (error) {
        console.log(error)
    }
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

const app = express();

app.use(cookieParser())

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    extname: 'hbs',
    partialsDir: 'dist/views/partials'
}));

// define a route handler for the default home page
// request might be authenticated
// - by req.query.code from Authentication Flow
// - by token in cookie added when redirected from anther page
// - by Authorization header
app.get("/", async (req, res) => {
    const auth = await o.isAuthorized(req, res, 'http://localhost:3000', 'admin')
    if (auth) {
        res.send('Hello world! This page for admin only! ')
    } else {
        res.sendStatus(401)
    }
});

app.get('/hbs', async (req, res, next) => {
    const auth = await o.isAuthorized(req, res, 'http://localhost:3000/hbs')
    if (auth) {
        res.render('home', { layout: 'default', template: 'home-template' });
    } else {
        res.sendStatus(401)
    }
});

app.get('/user', async (req, res, next) => {
    console.log(req)
    const code = req.query.code as string;
    console.log('got code '+code)
    await o.getTokenAuth(client_id, code, 'http://localhost:3000/user')
    const access_token = o.token.access_token
    console.log('got token '+access_token)
    await o.isAccessTokenValid(access_token)
    console.log('code valid '+o.isTokenValid)
    await o.getUserInfo(access_token)
    console.log('user info '+JSON.stringify(o.userInfo))
    const roles = o.getRoles(access_token)
    console.log('user roles '+roles)

    res.render('home', { layout: 'default', template: 'home-template' });
    console.log('>>>>>>>>>>>>>> logout - not working >>>>>>>>>>>>>>>')
    await o.logout(access_token, 'http://localhost:3000')
});

app.get('/admin', (req, res, next) => {
    res.render('home', { layout: 'default', template: 'home-template' });
});

app.get('/redirect', (req, res, next) => {
    res.cookie('token', o.token.access_token, {
       maxAge: 60000,
    })
    res.redirect('/')
});



const port = 3000; // default port to listen

// console.log(typeof null)
// enum Color {Red = 1, Green, Blue}
// const colorName: string = Color[2];

// console.log(Color.Green);
// start the Express server
console.log('Starting express')
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

