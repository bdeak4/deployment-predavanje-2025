import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryService } from 'src/category/category.service';

@Module({
  controllers: [QuizController],
  providers: [QuizService, PrismaService, CategoryService],
})
export class QuizModule {}
