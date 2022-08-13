import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() data: CreateUserDto){
      return this.authService.login(data)
  }

  
  @UseGuards(JwtGuard)
  @Get('profile')
  profile(@Request() req){
    return req.user
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto){
    return this.authService.registerUser(createUserDto)
  }
  
}
