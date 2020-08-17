import { Controller, Get, Delete, Put, Post, Param, Redirect, Res, Response, Query } from '@nestjs/common';
 
@Controller()
export class ProductController {
 
  @Get('/service/public')
  async route() {
    return "i am public"
  }

  @Get('/service/admin2')
  async findAll() {
    return "{view:'admin'}"
  }

  /*
  http://localhost:8080/auth/realms/demo/protocol/openid-connect/auth?response_type=code&client_id=demo-backend&redirect_uri=http://localhost:4000?scope=openid%20profile&state=wTCKSyoU%2F5V1MaylURBkGx7U
  */
 
}
