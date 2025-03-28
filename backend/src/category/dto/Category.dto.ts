import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CategoryDto {
  @ApiProperty({
    description: 'Category Name',
    example: 'Football',
    minLength: 3,
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: "Name of category can't be empty" })
  @MinLength(3, {
    message: 'Category name have to be at least 3 characters long.',
  })
  name: string;
}
