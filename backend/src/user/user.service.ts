import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    await this.isEmailAndUsernameUnique(createUserDto);

    return await this.prisma.user.create({ data: createUserDto });
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
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });

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
