import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryResponseDto } from './dto/category-response.dto';
import { plainToClass } from 'class-transformer';
import { CategoryDto } from './dto/category-cud.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CategoryDto) {
    const category = await this.findByName(createCategoryDto.name);

    if (category) {
      throw new ConflictException('Category with this name already exists');
    }

    return await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
      },
    });
  }

  async findByName(name: string) {
    return await this.prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
      include: {
        quizzes: {
          include: { quizResults: true },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.category.findMany({
      include: { quizzes: { include: { quizResults: true } } },
    });
  }

  async findUnique(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: id },
      include: {
        quizzes: {
          include: { quizResults: true, questions: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category with this id was not found');
    }

    return plainToClass(CategoryResponseDto, category);
  }

  async update(id: string, updateCategoryDto: CategoryDto) {
    const categoryById = await this.findUnique(id);

    if (!categoryById) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    const categoryByName = await this.findByName(updateCategoryDto.name);

    if (categoryByName) {
      throw new ConflictException('Category with this name already exists');
    }

    return await this.prisma.category.update({
      data: updateCategoryDto,
      where: { id: id },
    });
  }

  async remove(id: string) {
    const categoryById = await this.findUnique(id);

    if (!categoryById) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return await this.prisma.category.delete({ where: { id: id } });
  }
}
