import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ description: 'Question title' })
  title: string;

  @ApiProperty({ description: 'Question description' })
  description: string;

  @ApiProperty({ description: 'Question ctegory' })
  category: string;
}
