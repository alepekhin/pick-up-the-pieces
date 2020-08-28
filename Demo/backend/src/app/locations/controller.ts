import { Controller, Get, Delete, Put, Post, Param, Redirect, Res, Query, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import oidc from 'oidc';
import { Request, Response } from 'express'
import { GqlExecutionContext } from '@nestjs/graphql';

@Controller()
export class ProductController {

  @Get('/')
  async home() {
    return "Home page"
  }

  @Get('/login')
  @UseGuards(AuthGuard)
  async login(@Req() req: Request, @Res() res: Response) {
    res.send('You are logged');
  }

  @Get('/service/public')
  async route() {
    return "i am public"
  }

  @Get('/service/admin')
  @UseGuards(AuthGuard)
  async findAll() {
    return { "view": "admin" }
  }

  @Get('/graph')
  async graph(@Req() req: Request, @Res() res: Response,) {
  }

}
