import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateQuizDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'World War I' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'https://yourImage.jpg' })
  imgUrl: string;
}
