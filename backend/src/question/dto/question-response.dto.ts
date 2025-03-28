import { ApiProperty } from '@nestjs/swagger';

export class QuestionResponseDto {
  @ApiProperty({ example: '60633ffd-7486-4d83-ab21-879c599bec03' })
  id: string;

  @ApiProperty({ example: 'What is the speed of light?' })
  text: string;

  @ApiProperty({ example: 'MULTIPLE_CHOICE' })
  type: string;

  @ApiProperty({
    example: ['299,792,458 m/s', '1,000,000 m/s', '300,000,000 m/s'],
  })
  options: string[];

  @ApiProperty({ example: '299,792,458 m/s' })
  answer: string;
}
