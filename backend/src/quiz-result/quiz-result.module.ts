import { Module } from '@nestjs/common';
import { QuizResultService } from './quiz-result.service';
import { QuizResultController } from './quiz-result.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { QuizService } from 'src/quiz/quiz.service';
import { CategoryService } from 'src/category/category.service';

@Module({
  controllers: [QuizResultController],
  providers: [
    QuizResultService,
    PrismaService,
    UserService,
    QuizService,
    CategoryService,
  ],
})
export class QuizResultModule {}
