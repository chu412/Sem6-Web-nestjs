import { Controller, Get, Post, Render, Param, Req, Res, UseInterceptors, UseGuards, Body, } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { TransformInterceptor } from './transform.interceptor';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';


@Controller()
export class AppController {

  constructor(private authService: AuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() data: CreateUserDto){
    return this.authService.login(data)
  }

  @Post('register')
  register(@Body() createUser: CreateUserDto){
    return this.authService.registerUser(createUser)

  }

  @Get('index')
  @UseInterceptors(TransformInterceptor)
  @Render('content/index')
  getIndex() {
    return { title: 'About me'};
  }

  @Get('gallery')
  @UseInterceptors(TransformInterceptor)
  @Render('content/gallery')
  getGallery() {
    return { title: 'Gallery' };
  }

  @Get('money')
  @UseInterceptors(TransformInterceptor)
  @Render('content/money')
  getMoney() {
    return { title: 'Money' };
  }

  @Get('contact')
  @UseInterceptors(TransformInterceptor)
  @Render('content/contact')
  getContact() {
    return { title: 'Contact' };
  }

  @Get(['login', ''])
  @UseInterceptors(TransformInterceptor)
  @Render('content/login')
  home(@Req() request: Request) {
    return { title: 'login', loginInfo: request.cookies };
  }

  @Get('register')
  @UseInterceptors(TransformInterceptor)
  @Render('content/register')
  getRegister() {
    return { title: 'Register' };
  }

}