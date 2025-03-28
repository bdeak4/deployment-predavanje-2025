import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class QuizResponseDto {
  @ApiProperty({
    description: 'Quiz ID',
    example: randomUUID(),
  })
  id: string;
}
