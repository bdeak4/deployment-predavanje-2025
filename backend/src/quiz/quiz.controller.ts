import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { QuizCudResponseDto } from './dto/cud-response-quiz.dto';
import { QuizResponseDto } from './dto/response-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @ApiOperation({ summary: 'Create new quiz' })
  @ApiBody({
    description: 'Quiz data to create a new quiz',
    type: CreateQuizDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created quiz',
    type: QuizCudResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Quiz with this name already exists',
  })
  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiResponse({ status: 200, description: 'Quizzes found successfully' })
  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @ApiOperation({ summary: 'Get unique quiz by ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter category ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Quiz found successfully',
    type: QuizResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @ApiOperation({ summary: 'Update quiz by ID' })
  @ApiBody({
    description: 'Quiz data to update a category',
    type: UpdateQuizDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Enter quiz ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully updated quiz',
    type: QuizCudResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(id, updateQuizDto);
  }

  @ApiOperation({ summary: 'Delete quiz by ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter quiz ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully deleted quiz',
    type: QuizCudResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.delete(id);
  }
}
