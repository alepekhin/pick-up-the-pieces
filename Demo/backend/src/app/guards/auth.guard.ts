import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import oidc from 'oidc'
import { Request, Response } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log('Inside AuthGuard')
        let req = context.switchToHttp().getRequest()
        let res = context.switchToHttp().getResponse()
        console.log('Inside AuthGuard req '+req)
        let isAppoloRequest = false
        if (req == undefined) {
            isAppoloRequest = true
            const ctx = GqlExecutionContext.create(context);
            req = ctx.getContext().req;
            res = ctx.getContext().res;
            console.log('Inside AuthGuard graphql req '+req)
        }
        return this.validateRequest(req, res, isAppoloRequest)
    }


    validateRequest = async (request: Request, response: Response, isAppoloRequest:boolean) => {
        return await this.isAuthorized(request, response, isAppoloRequest)
    }

    /*
    Method working for express app, assuming in caller code
    
    import express,{Request,Response} from "express";
    import cookieParser from 'cookie-parser';
    
    const app = express();
    app.use(cookieParser())
    
    */
    isAuthorized = async (req: Request, res: Response, isAppoloRequest:boolean, role?: string) => {
        const url = req.protocol + '://' + req.hostname +':4000'+ req.path
        console.log('inside AuthGuard, url '+url)
        const o = new oidc('http://localhost:8080/auth') // oidc endpoint
        const client_id = 'demo-backend'
        await o.init('demo')
        let access_token = null
        if (req.cookies.token) { // check if cookie present
            access_token = req.cookies.token
            console.log('inside AuthGuard, access token from cookie '+access_token)
        } else if (req.headers.authorization) { // check if header present
            const auth = req.headers.authorization
            if (auth.startsWith('bearer')) {
                access_token = auth.replace('bearer ', '')
                console.log('inside AuthGuard, access token from bearer '+access_token)
            }
        } else if (req.query.code) { // check code
            await o.getTokenAuth(client_id as string, req.query.code as string, url)
            access_token = o.token.access_token;
            console.log('inside AuthGuard, access token from code '+access_token)
        }
        console.log('inside AuthGuard, access token '+access_token)
        if (access_token) {
            await o.getUserInfo(access_token)
            console.log('inside AuthGuard, got user info')
            return true
        } else {
            if (isAppoloRequest) {
                console.log('inside AuthGuard, appolo return false')
                return false
            } else {
                console.log('inside AuthGuard, redirecting to login page')
                res.redirect(o.endpoint?.authorization_endpoint + `?client_id=${client_id}&redirect_uri=${url}&response_type=code&scope=openid`);
            }
        }
    }
}
