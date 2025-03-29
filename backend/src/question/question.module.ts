import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizService } from 'src/quiz/quiz.service';
import { CategoryService } from 'src/category/category.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, PrismaService, QuizService, CategoryService],
})
export class QuestionModule {}
