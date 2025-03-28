import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/Category.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create category (only admin)' })
  @ApiBody({
    description: 'Category data to create a new category',
    type: CategoryDto,
  })
  @ApiResponse({ status: 201, description: 'Successfully created category' })
  @ApiResponse({
    status: 409,
    description: 'Category with this name already exists',
  })
  @Post()
  async create(@Body() createCategoryDto: CategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Categories found successfully' })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Get unique category by ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter category ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({ status: 200, description: 'Category found successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findUnique(id);
  }

  @ApiOperation({ summary: 'Update category' })
  @ApiBody({
    description: 'Category data to update a category',
    type: CategoryDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Enter category ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({ status: 201, description: 'Successfully updated category' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete category by ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter category ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({ status: 200, description: 'Successfully deleted category' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
