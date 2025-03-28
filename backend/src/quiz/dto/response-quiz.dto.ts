import { ApiProperty } from '@nestjs/swagger';
import { QuestionResponseDto } from 'src/question/dto/question-response.dto';
import { QuizResultResponseDto } from 'src/quiz-result/dto/QuizResultResponse.dto';

export class QuizResponseDto {
  @ApiProperty({ example: '60633ffd-7486-4d83-ab21-879c599bec03' })
  id: string;

  @ApiProperty({ example: 'Physics Basics' })
  name: string;

  @ApiProperty({
    example:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTavLwcbETwRocb6mx3QuvdRGAnsAYqsOCPBQ&s',
  })
  imgUrl: string;

  @ApiProperty({ example: '500d77ec-e5b9-4cf7-a57f-065ed847c61a' })
  categoryId: string;

  @ApiProperty({ type: [QuestionResponseDto] })
  questions: QuestionResponseDto[];

  @ApiProperty({ type: [QuizResultResponseDto] })
  quizResults: QuizResultResponseDto[];
}
