import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class UpdateQuizDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'World War I' })
  name: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  @ApiProperty({ example: 'https://yourImage.jpg' })
  imgUrl: string;
}
