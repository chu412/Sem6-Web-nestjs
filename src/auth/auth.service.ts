import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { isError } from 'util';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

  private usersService: UsersService;
  constructor(
    private moduleRef: ModuleRef, 
    private jwtService: JwtService){}
  
  onModuleInit() {
    this.usersService = this.moduleRef.get(UsersService, { strict: false })
  }
  
  async valdiateUser(email: string, password: string): Promise<any>{
      const user = await this.usersService.findOneByEmail(email)
      if (user.password !== password) return false;
      return user
   }

  login(user: any){
    const accessToken = this.jwtService.sign({ sub: user.id, email: user.email})
    return {
      access_token: accessToken
    }

  }

  async registerUser(createUserDto: CreateUserDto) { 
    const newUser = await this.usersService.create(createUserDto)
    //return this.login(newUser)
    return newUser;

  }
}
