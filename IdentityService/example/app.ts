import Oidc from 'oidc'
import express, { Request, Response } from "express"
import cookieParser from 'cookie-parser'
import cors from 'cors'

const port = 3000;

// keycloak
/*
export const identityServiceURL = 'http://localhost:8080/auth/realms/demo/.well-known/openid-configuration'
export const clientid = 'demo-backend'
export const clientsecret = '1304e3fe-8564-4a24-a7b0-f3337d1ce125'
export const loginRedirectURL = `http://localhost:${port}/oauth_callback`
export const logouturl = `http://localhost:${port}/logout`
*/
// google

export const identityServiceURL = 'https://accounts.google.com/.well-known/openid-configuration'
export const clientid = '388193507328-h6utdvsdpe9bji4fuur4up0ob88cb47g.apps.googleusercontent.com'
export const clientsecret = 'iLB3lozYdSKFs_4Igcdesnrr'
export const loginRedirectURL = `http://localhost:${port}/oauth_callback`
export const logouturl = `http://localhost:${port}/logout`

/*
Examlpe of axios-oidc usage
*/
// --------------- backend functions (resources): --------------------
const publicResource = () => {
    return 'Inside public resource'
}

const protectedResource = () => {
    return 'Inside protected resource'
}

// --------------- frontend functions --------------------

const app = express();

app.use(cors())
app.use(cookieParser())

app.get("/", (req, res, next) => {
    res.send('home <a href="/public">public resource</a> <a href="/protected">protected resource</a>');
});

const o = new Oidc(identityServiceURL) // oidc endpoint

app.get('/public', async (req, res, next) => {
    res.send(publicResource());
});

app.get('/protected', async (req, res, next) => {
    const isAuthenticated = await o.isAuthenticated()
    console.log('isAuthenticeated? '+ isAuthenticated)
    if (!isAuthenticated) {
        res.redirect(await o.getLoginURL(clientid, loginRedirectURL))
    } else {
        console.log('authenticated user ',o.userInfo?.name)
        console.log('authenticated email ',o.userInfo?.email)
        res.send(protectedResource() + ' <a href="/logout">logout</a>');
    }
});

app.get('/oauth_callback', async (req, res, next) => {
    console.log('authorized for oauth_callback')
    await o.getAccessToken(clientid as string, clientsecret as string, req.query.code as string, loginRedirectURL)
    res.redirect('/protected')
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

app.get("/logout", (req, res) => {
    o.logout()
    console.log('logout completed')
    res.redirect('/')
})



