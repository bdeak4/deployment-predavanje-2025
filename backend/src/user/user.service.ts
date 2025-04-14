import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/enums/Role';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(createUserDto.username)) {
      throw new BadRequestException(
        'Username must be a single word with no spaces',
      );
    }

    await this.isEmailAndUsernameUnique(createUserDto);

    return await this.prisma.user.create({ data: createUserDto });
  }

  async findByEmailOrUsername(prompt: string) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email: prompt }, { username: prompt }] },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or username');
    }

    return user;
  }

  async isEmailAndUsernameUnique(createUserDto: CreateUserDto | UpdateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      },
    });

    if (user) {
      throw new ConflictException('User must have unique email and username.');
    }

    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany({ include: { quizResults: true } });
  }

  async getRanking(user: any) {
    const allUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        points: true,
        quizResults: { include: { quiz: true } },
      },
      orderBy: { points: 'desc' },
    });

    if (user.role === Role.Admin) {
      return allUsers;
    }

    const rank = allUsers.findIndex((u) => u.id === user.userId) + 1;

    const currentUser = await this.prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        username: true,
        points: true,
        quizResults: { include: { quiz: true } },
      },
    });

    return { user: currentUser, rank: rank, totalUsers: allUsers.length };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: { quizResults: { include: { quiz: true } } },
    });

    if (!user) {
      throw new NotFoundException('User with that ID was not found.');
    }

    return user;
  }

  async updatePoints(userId: string, pointsDelta: number) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        points: {
          increment: pointsDelta,
        },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    await this.isEmailAndUsernameUnique(updateUserDto);

    return await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prisma.user.delete({
      where: { id: id },
    });
  }
}
