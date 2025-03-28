import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CategoryDto } from './dto/category-cud.dto';

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
  create(@Body() createCategoryDto: CategoryDto) {
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
  @ApiResponse({
    status: 200,
    description: 'Category found successfully',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findUnique(id);
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
  @ApiResponse({
    status: 201,
    description: 'Successfully updated category',
    type: CategoryDto,
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: CategoryDto) {
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
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
