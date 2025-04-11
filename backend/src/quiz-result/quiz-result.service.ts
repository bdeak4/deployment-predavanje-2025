import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuizResultDto } from './dto/create-quiz-result.dto';
import { UpdateQuizResultDto } from './dto/update-quiz-result.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizService } from 'src/quiz/quiz.service';
import { UserService } from 'src/user/user.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class QuizResultService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly quizService: QuizService,
    private readonly userService: UserService,
  ) {}

  async create(createQuizResultDto: CreateQuizResultDto, userId: string) {
    await this.quizService.findOne(createQuizResultDto.quizId);
    console.log(userId);
    await this.userService.findOne(userId);
    await this.userService.updatePoints(userId, createQuizResultDto.score);

    const quizResultData = {
      userId: userId,
      quizId: createQuizResultDto.quizId,
      score: createQuizResultDto.score,
    };

    return this.prisma.quizResult.create({ data: quizResultData });
  }

  async findAll() {
    return await this.prisma.quizResult.findMany();
  }

  async findOne(id: string) {
    const result = await this.prisma.quizResult.findUnique({
      where: { id: id },
    });

    if (!result) {
      throw new NotFoundException('Quiz result with this id was not found.');
    }

    return result;
  }

  async update(id: string, updateQuizResultDto: UpdateQuizResultDto) {
    if (updateQuizResultDto.score < 0) {
      throw new BadRequestException('Score cannot be negative');
    }
    const result = await this.findOne(id);

    const previousScore = result.score;
    const newScore = updateQuizResultDto.score;

    const pointsDelta = newScore - previousScore;

    await this.userService.updatePoints(result.userId, pointsDelta);

    return await this.prisma.quizResult.update({
      where: { id: id },
      data: { score: updateQuizResultDto.score },
    });
  }

  async remove(id: string) {
    const result = await this.findOne(id);

    await this.userService.updatePoints(result.userId, -result.score);

    return await this.prisma.quizResult.delete({
      where: { id: id },
    });
  }
}
