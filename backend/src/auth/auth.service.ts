import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { comparePassword, hashPassword } from 'src/utils/handleHashing';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LogInDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(body: LogInDto) {
    const user = await this.userService.findByEmailOrUsername(body.prompt);

    if (user && (await comparePassword(body.password, user.password))) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(body: RegisterDto) {
    const hashedPassword = await hashPassword(body.password);

    const user = {
      username: body.username,
      email: body.email,
      password: hashedPassword,
    } as CreateUserDto;

    return this.userService.create(user);
  }
}
