import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/Category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CategoryDto) {
    const category = await this.findByName(createCategoryDto.name);

    if (category) {
      throw new ConflictException('Category with this name already exists');
    }

    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findByName(name: string) {
    return await this.prisma.category.findUnique({
      where: { name: name },
      include: { quizzes: true },
    });
  }

  async findAll() {
    return await this.prisma.category.findMany({ include: { quizzes: true } });
  }

  async findUnique(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: id },
      include: { quizzes: true },
    });

    if (!category) {
      throw new NotFoundException('Category with this id was not found');
    }

    return category;
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
