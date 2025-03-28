import { Module } from '@nestjs/common';
import { QuizResultService } from './quiz-result.service';
import { QuizResultController } from './quiz-result.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [QuizResultController],
  providers: [QuizResultService, PrismaService],
})
export class QuizResultModule {}
