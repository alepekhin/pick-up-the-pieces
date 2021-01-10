import oidc from 'oidc'
import express, { Request, Response } from "express"
import cookieParser from 'cookie-parser'
import cors from 'cors'

// keycloak
/*
const port = 3000;
export const identityServiceURL = 'http://localhost:8080/auth/realms/demo/.well-known/openid-configuration'
export const client_id = 'demo-backend'
export const client_secret = '1304e3fe-8564-4a24-a7b0-f3337d1ce125'
export const loginRedirectURL = 'http://localhost:3000/protected'
export const logout_url = 'http://localhost:3000/logout'
*/
// google

const port = 8081;
export const identityServiceURL = 'https://accounts.google.com/.well-known/openid-configuration'
export const client_id = '388193507328-h6utdvsdpe9bji4fuur4up0ob88cb47g.apps.googleusercontent.com'
export const client_secret = 'iLB3lozYdSKFs_4Igcdesnrr'
export const loginRedirectURL = 'http://localhost:8081/oauth_callback'
export const logout_url = 'http://localhost:8081/logout'

/*
Examlpe of axios-oidc usage
*/
// --------------- backend functions: --------------------
const public_resource = () => {
    return 'Inside public resource'
}

const protected_resource = () => {
    return 'Inside protected resource'
}

// --------------- frontend functions --------------------

const app = express();

app.use(cors())
app.use(cookieParser())

app.get("/", (req, res, next) => {
    res.send('home <a href="/public">public resource</a> <a href="/protected">protected resource</a>');
});


app.get("/logout", async (req, res) => {
    const url = logout_url
    const o = new oidc(identityServiceURL) // oidc endpoint
    await o.init()
    let access_token = null
    let refresh_token = null
    if (req.cookies.token) { // check if cookie present
        access_token = req.cookies.token
        console.log('logout got access_code from cookie')
    } else if (req.headers.authorization) { // check if header present
        const auth = req.headers.authorization
        if (auth.startsWith('bearer')) {
            access_token = auth.replace('bearer ', '')
            console.log('logout got access_code from bearer')
        }
    } else if (req.query.code) { // check code
        await o.getTokenAuth(client_id as string, client_secret as string, req.query.code as string, url)
        access_token = o.token.access_token;
        refresh_token = o.token.refresh_token;
        console.log('logout got access_code from code')
    }
    console.log('>>> inside logout, access_token ' + access_token)
    console.log('>>> inside logout, refresh_token ' + refresh_token)
    if (access_token) {
        try {
            console.log('>>> logout start ')
            await o.logout(access_token, refresh_token as string, client_id, client_secret, loginRedirectURL)
            console.log('>>> logout end ')
        } catch (e) {
            console.log('>>> logout error ' + e)
        }
        res.redirect('/')
    } else {
        // res.redirect(o.endpoint?.authorization_endpoint + `?client_id=${client_id}&redirect_uri=${url}&response_type=code&scope=${scope}`);
        res.redirect(o.getLoginURL(client_id, url))
    }
})

/*
Method working for express app, assuming in caller code

import express,{Request,Response} from "express";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser())

*/
const isAuthorized = async (req: Request, res: Response, url: string, role?: string) => {
    const o = new oidc(identityServiceURL) // oidc endpoint
    await o.init()
    let access_token = null
    let id_token = null
    if (req.cookies.token) { // check if cookie present
        access_token = req.cookies.token
        console.log('got access_code from cookie')
    } else if (req.headers.authorization) { // check if header present
        const auth = req.headers.authorization
        if (auth.startsWith('bearer')) {
            access_token = auth.replace('bearer ', '')
            console.log('got access_code from bearer')
        }
    } else if (req.query.code) { // check code
        await o.getTokenAuth(client_id as string, client_secret as string, req.query.code as string, url)
        access_token = o.token.access_token;
        console.log('got access_token from code')
        id_token = o.token.id_token;
        if (id_token) {
            const idToken = JSON.parse(
                Buffer.from(JSON.stringify(id_token).split('.')[1], 'base64').toString()
            )
            console.log('got id_token from code ', idToken)
        }
    }
    if (access_token) {
        await o.getUserInfo(access_token)
        console.log('got user info: '+JSON.stringify(o.userInfo))
        if (role) {
            const roles = await o.getRoles(access_token, client_id)
            if (roles.includes(role)) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }
    console.log('redirecting to login page')
    // res.redirect(o.endpoint?.authorization_endpoint + `?client_id=${client_id}&redirect_uri=${loginRedirectURL}&response_type=code&scope=${scope}`);
    res.redirect(o.getLoginURL(client_id, loginRedirectURL))
    return false
}

app.get('/public', async (req, res, next) => {
    res.send(public_resource());
});

app.get('/protected', async (req, res, next) => {
    console.log('authorizing for protected')
    try {
        const auth = await isAuthorized(req, res, loginRedirectURL, 'admin')
        if (auth) {
            console.log('go to protected')
            res.send(protected_resource() + ' <a href="/logout">logout</a>');
        }
    } catch (error) {
        return next(error)
    }
});

app.get('/oauth_callback', async (req, res, next) => {
    console.log('authorizing for oauth_callback')
    try {
        // don't check role for google auth
        const auth = await isAuthorized(req, res, loginRedirectURL)
        if (auth) {
            console.log('go to protected')
            res.send(protected_resource() + ' <a href="/logout">logout</a>');
        }
    } catch (error) {
        return next(error)
    }
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

