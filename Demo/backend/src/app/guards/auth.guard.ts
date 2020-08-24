import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import oidc from 'oidc'
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    o = new oidc('http://localhost:8080/auth')
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        return validateRequest(request)
    }
}

const validateRequest = async (request: Request) => {
    await this.o.init('demo')    
    return await isAuthorized(request)
}

/*
Method working for express app, assuming in caller code

import express,{Request,Response} from "express";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser())

*/
const isAuthorized = async (req: Request, role?: string) => {
    let access_token = ''
    if (req.headers.authorization) { // check if header present
        const auth = req.headers.authorization
        if (auth.startsWith('bearer')) {
            access_token = auth.replace('bearer ', '')
            this.o.isAccessTokenValid(access_token)
            if (!this.o.isTokenValid) {
                return false
            }
            const roles = this.o.getRoles(access_token)
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
    } else {
        return false
    }
}

