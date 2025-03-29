import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from './category-cud.dto';

export class CategoryCudResponseDto extends CategoryDto {
  @ApiProperty({ example: '60633ffd-7486-4d83-ab21-879c599bec03' })
  id: string;
}
