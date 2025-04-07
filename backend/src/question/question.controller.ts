import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { QuestionResponseDto } from './dto/question-response.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AdminGuard } from 'src/auth/guard/admin.guard';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create new question' })
  @ApiBody({
    description: 'Question data to create a new question',
    type: CreateQuestionDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created question',
    type: QuestionResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Question with this name already exists',
  })
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({
    status: 200,
    description: 'Questions found successfully',
    type: QuestionResponseDto,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @ApiOperation({ summary: 'Get unique question by ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter question ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Question found successfully',
    type: QuestionResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update question by ID' })
  @ApiBody({
    description: 'Question data to update a category',
    type: UpdateQuestionDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Enter question ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully updated question',
    type: QuestionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete question by ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter question ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted question',
    type: QuestionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
