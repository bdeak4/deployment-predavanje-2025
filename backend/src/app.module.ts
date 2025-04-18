import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { QuizModule } from './quiz/quiz.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { QuizResultModule } from './quiz-result/quiz-result.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'frontend', 'dist'),
    }),
    QuestionModule,
    QuizModule,
    CategoryModule,
    UserModule,
    QuizResultModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
