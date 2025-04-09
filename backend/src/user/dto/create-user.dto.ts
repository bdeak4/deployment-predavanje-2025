import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty({ example: 'gadzam' })
  username: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsEmail()
  @ApiProperty({ example: 'gadzam@net.hr' })
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ example: 'test123' })
  password: string;
}
