import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private jwtAuthService: JwtService){}

  async register(registerAuthDto: RegisterAuthDto) {

    const { password, email, name } = registerAuthDto

    if (!email || !password) {
      throw new BadRequestException('Email y password son requeridos');
    }
    
    const plainToHash = await hash(password, 10)

    return this.prisma.usuario.create({
      data:{
        email,
        name,
        password: plainToHash
      }
    })
  }

 async login(loginAuthDto: LoginAuthDto){

  const { email, password } = loginAuthDto

  const findUser = await this.prisma.usuario.findUnique({where:{email}}) 

  if(!findUser) throw new NotFoundException('Usuario no encontrado')

  const checkPassword = await compare(password, findUser.password)

  if(!checkPassword) throw new NotFoundException('contraseña erronea')

  const payload = {id:findUser.id, name: findUser.name}
  const token = await this.jwtAuthService.sign(payload)

  const data = {
    user: findUser,
    token
  }

  return data
  
 }

}
