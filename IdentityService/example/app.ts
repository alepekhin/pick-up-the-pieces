import oidc from 'oidc'
import express, { Request, Response } from "express"
import cookieParser from 'cookie-parser'

const port = 3000;

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

app.use(cookieParser())

app.get("/", (req, res, next) => {
    res.send('home <a href="/public">public resource</a> <a href="/protected">protected resource</a>');
});


app.get("/logout", async (req, res) => {
    const url = 'http://localhost:3000/logout'
    const o = new oidc('http://localhost:8080/auth') // oidc endpoint
    await o.init('demo')
    const client_id = 'demo-backend'
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
        await o.getTokenAuth(client_id as string, req.query.code as string, url)
        access_token = o.token.access_token;
        refresh_token = o.token.refresh_token;
        console.log('logout got access_code from code')
    }
    console.log('>>> inside logout, access_token '+access_token)
    console.log('>>> inside logout, refresh_token '+refresh_token)
    if (access_token) {
        try {
            console.log('>>> logout start ')
            await o.logout(access_token, refresh_token as string, client_id, 'http://localhost:3000')
            console.log('>>> logout end ')
        } catch (e) {
            console.log('>>> logout error '+e)
        }
    } else {
        res.redirect(o.endpoint?.authorization_endpoint + `?client_id=${client_id}&redirect_uri=${url}&response_type=code&scope=openid`);
    }
    res.redirect('/')
})

/*
Method working for express app, assuming in caller code

import express,{Request,Response} from "express";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser())

*/
const isAuthorized = async (req: Request, res: Response, url: string, role?: string) => {
    const o = new oidc('http://localhost:8080/auth') // oidc endpoint
    await o.init('demo')
    const client_id = 'demo-backend'
    let access_token = null
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
        await o.getTokenAuth(client_id as string, req.query.code as string, url)
        access_token = o.token.access_token;
        console.log('got access_code from code')
    }
    if (access_token) {
        await o.getUserInfo(access_token)
        const roles = await o.getRoles(access_token, client_id)
        if (role) {
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
    res.redirect(o.endpoint?.authorization_endpoint + `?client_id=${client_id}&redirect_uri=${url}&response_type=code&scope=openid`);
    return false
}

app.get('/public', async (req, res, next) => {
    res.send(public_resource());
});

app.get('/protected', async (req, res, next) => {
    const auth = await isAuthorized(req, res, `http://localhost:${port}/protected`,'admin')
    if (auth) {
        res.send(protected_resource()+' <a href="/logout">logout</a>');
    } else {
        res.sendStatus(401)
    }
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

