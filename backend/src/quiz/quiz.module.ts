import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryService } from 'src/category/category.service';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [QuestionModule],
  controllers: [QuizController],
  providers: [QuizService, PrismaService, CategoryService],
  exports: [QuizService],
})
export class QuizModule {}
