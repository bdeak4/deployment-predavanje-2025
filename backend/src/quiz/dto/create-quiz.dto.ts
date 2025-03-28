import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UpdateQuizDto } from './update-quiz.dto';

export class CreateQuizDto extends UpdateQuizDto {
  @IsString()
  @IsNotEmpty({ message: 'Category ID cannot be empty' })
  @IsUUID('4', { message: 'Invalid category ID format (UUID expected)' })
  @ApiProperty({ example: '60633ffd-7486-4d83-ab21-879c599bec03' })
  categoryId: string;
}
