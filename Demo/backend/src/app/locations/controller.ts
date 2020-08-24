import { Controller, Get, Delete, Put, Post, Param, Redirect, Res, Response, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
 
@Controller()
@UseGuards(AuthGuard)
export class ProductController {
 
  @Get('/service/public')
  async route() {
    return "i am public"
  }

  @Get('/service/admin')
  async findAll() {
    return {"view":"admin"}
  }
 
}
