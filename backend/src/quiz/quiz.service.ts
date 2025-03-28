import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async searchQuizzesByName(name: string) {
    if (!name) return [];

    return this.prisma.quiz.findMany({ where: { name: name } });
  }

  async findAll() {
    return await this.prisma.quiz.findMany({
      include: {
        questions: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.quiz.findUnique({
      where: { id: id },
      include: {
        questions: true,
      },
    });
  }
}
