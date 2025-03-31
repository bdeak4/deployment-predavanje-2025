import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserResponseDto } from 'src/user/dto/create-user-response.dto';
import { JwtToken } from './dto/jwt-example.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Log in' })
  @ApiBody({
    description: 'user information to login',
    type: LogInDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully logged in',
    type: JwtToken,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @Post('login')
  async login(@Body() body: LogInDto) {
    const user = await this.authService.validateUser(body);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }
  @ApiOperation({ summary: 'Register new account' })
  @ApiBody({
    description: 'user information to register',
    type: RegisterDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully logged in',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
