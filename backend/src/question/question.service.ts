import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizService } from 'src/quiz/quiz.service';
import { UpdateQuizDto } from 'src/quiz/dto/update-quiz.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly quizService: QuizService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    await this.quizService.findOne(createQuestionDto.quizId);

    return await this.prisma.question.create({ data: createQuestionDto });
  }

  async findAll() {
    return await this.prisma.question.findMany();
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id: id },
    });

    if (!question) {
      throw new NotFoundException('Question with this id was not found.');
    }
    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    await this.findOne(id);

    return await this.prisma.question.update({
      where: { id: id },
      data: updateQuestionDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prisma.question.delete({
      where: { id: id },
    });
  }
}
