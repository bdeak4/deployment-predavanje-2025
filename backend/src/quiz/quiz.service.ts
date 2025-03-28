import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    const quiz = await this.searchQuizzesByName(createQuizDto.name);

    if (quiz.length > 0) {
      throw new ConflictException('Quiz with that name already exists.');
    }

    return this.prisma.quiz.create({ data: createQuizDto });
  }

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
