import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { QuizModule } from './quiz/quiz.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { QuizResultModule } from './quiz-result/quiz-result.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [QuestionModule, QuizModule, CategoryModule, UserModule, QuizResultModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
