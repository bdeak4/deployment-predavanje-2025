import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'dump@gmail.com' })
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ example: 'dump' })
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ example: 'test1234' })
  password: string;
}
