import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  imgUrl: string;

  @IsString()
  categoryId: string;
}
