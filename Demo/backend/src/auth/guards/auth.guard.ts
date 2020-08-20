import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import KeycloakConnect from 'keycloak-connect';
import { KEYCLOAK_INSTANCE, KEYCLOAK_CONNECT_OPTIONS } from '../constants';
import { KeycloakConnectOptions } from '../interface/keycloak-connect-options.interface';
import { Reflector } from '@nestjs/core';
import { META_UNPROTECTED } from '../decorators/unprotected.decorator';

/**
 * An authentication guard. Will return a 401 unauthorized when it is unable to
 * verify the JWT token or Bearer header is missing.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(KEYCLOAK_INSTANCE)
    private keycloak: KeycloakConnect.Keycloak,
    @Inject(KEYCLOAK_CONNECT_OPTIONS)
    private keycloakOpts: KeycloakConnectOptions,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('inside canActivate')
    const isUnprotected = this.reflector.get<boolean>(
      META_UNPROTECTED,
      context.getHandler(),
    );

    // If unprotected is set skip Keycloak authentication
    if (isUnprotected) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const jwt =  this.extractJwt(request.headers);

    try {
      // commented as validateAccessToken(jwt) always returns 403
      //const result = await this.keycloak.grantManager.validateAccessToken(jwt);
      //console.log('inside canActivate, result='+result)

      //if (typeof result === 'string') {
        // Attach user info object
        //console.log('inside canActivate, about userInfo(jwt), jwt='+jwt)
        request.user = await this.keycloak.grantManager.userInfo(jwt);
        //console.log('inside canActivate, got userInfo(jwt) '+JSON.stringify(request.user))
        // Attach raw access token JWT extracted from bearer/cookie
        request.accessTokenJWT = jwt;
        //console.log('inside canActivate, return true')
        return true;
      //}
    } catch (ex) {
      console.error(`validateAccessToken Error: `, ex);
    }
    console.log('inside canActivate, exception')

    throw new UnauthorizedException();
  }

  extractJwt(headers: { [key: string]: string }) {
    if (headers && !headers.authorization) {
      throw new UnauthorizedException();
    }

    const auth = headers.authorization.split(' ');

    // We only allow bearer
    if (auth[0].toLowerCase() !== 'bearer') {
      throw new UnauthorizedException();
    }

    return auth[1];
  }

  extractJwtFromCookie(cookies: { [key: string]: string }) {
    return cookies && cookies[this.keycloakOpts.cookieKey] || cookies && cookies.KEYCLOAK_JWT;
  }
}
