import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CategoryService } from 'src/category/category.service';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createQuizDto: CreateQuizDto) {
    const quiz = await this.searchQuizzesByName(createQuizDto.name);

    if (quiz.length > 0) {
      throw new ConflictException('Quiz with that name already exists.');
    }

    const category = await this.categoryService.findUnique(
      createQuizDto.categoryId,
    );

    return await this.prisma.quiz.create({ data: createQuizDto });
  }

  async searchQuizzesByName(name: string) {
    return this.prisma.quiz.findMany({ where: { name: name } });
  }

  async findAll() {
    const quizzes = await this.prisma.quiz.findMany({
      include: {
        questions: true,
        quizResults: true,
        category: true,
      },
    });

    if (!quizzes) {
      return [];
    }

    return quizzes;
  }

  async findOne(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: id },
      include: {
        questions: true,
        quizResults: true,
        category: true,
      },
    });
    if (!quiz) {
      throw new NotFoundException('Quiz with this id was not found.');
    }

    return quiz;
  }

  async update(id: string, updateQuiz: UpdateQuizDto) {
    const quizzes = await this.searchQuizzesByName(updateQuiz.name);
    if (quizzes.length > 0) {
      throw new ConflictException('Already exists quiz with this name');
    }

    return await this.prisma.quiz.update({
      where: { id: id },
      data: updateQuiz,
    });
  }

  async delete(id: string) {
    await this.findOne(id);

    return await this.prisma.quiz.delete({ where: { id: id } });
  }
}
