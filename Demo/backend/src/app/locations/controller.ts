import { Controller, Get, Delete, Put, Post, Param, Redirect, Res, Response, Query } from '@nestjs/common';
import { Roles, Unprotected } from 'src/auth';
 
@Controller()
export class ProductController {
 
  @Get('/service/public')
  @Unprotected()
  async route() {
    return "i am public"
  }

  @Get('/service/admin')
  @Roles('admin')
  async findAll() {
    return {"view":"admin"}
  }
 
}
