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
        let req = context.switchToHttp().getRequest()
        let res = context.switchToHttp().getResponse()
        let isAppoloRequest = false
        if (req == undefined) {
            isAppoloRequest = true
            const ctx = GqlExecutionContext.create(context);
            req = ctx.getContext().req;
            res = ctx.getContext().res;
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
        const o = new oidc('http://localhost:8080/auth') // oidc endpoint
        const client_id = 'demo-backend'
        await o.init('demo')
        let access_token = null
        if (req.cookies.token) { // check if cookie present
            access_token = req.cookies.token
        } else if (req.headers.authorization) { // check if header present
            const auth = req.headers.authorization
            if (auth.toLowerCase().startsWith('bearer')) {
                access_token = auth.substring(7)
            }
        } else if (req.query.code) { // check code
            await o.getTokenAuth(client_id as string, req.query.code as string, url)
            access_token = o.token.access_token;
        }
        if (access_token) {
            await o.getUserInfo(access_token)
            return true
        } else {
            if (isAppoloRequest) {
                return false
            } else {
                res.redirect(o.endpoint?.authorization_endpoint + `?client_id=${client_id}&redirect_uri=${url}&response_type=code&scope=openid`);
            }
        }
    }
}
