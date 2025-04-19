import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { QuizResultService } from './quiz-result.service';
import { CreateQuizResultDto } from './dto/create-quiz-result.dto';
import { UpdateQuizResultDto } from './dto/update-quiz-result.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { QuizResultResponseDto } from './dto/QuizResultResponse.dto';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { UserGuard } from 'src/auth/guard/user.guard';

@Controller('quiz-result')
export class QuizResultController {
  constructor(private readonly quizResultService: QuizResultService) {}

  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Create new quiz-result' })
  @ApiBody({
    description: 'Quiz-result data to create a new quiz-result',
    type: CreateQuizResultDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created quiz-result',
    type: QuizResultResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found userid or quizid',
  })
  @Post()
  async create(
    @Body() createQuizResultDto: CreateQuizResultDto,
    @Req() request: any,
  ) {
    const userId = request.user.userId;
    return this.quizResultService.create(createQuizResultDto, userId);
  }

  @ApiOperation({ summary: 'Get all quiz results' })
  @ApiResponse({
    status: 200,
    description: 'Results found successfully',
    type: QuizResultResponseDto,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.quizResultService.findAll();
  }

  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Get unique quiz result by ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter quiz result ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'User found successfully',
    type: CreateQuizResultDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizResultService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update quiz result by ID' })
  @ApiBody({
    description: 'Quiz result data to update',
    type: UpdateQuizResultDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Enter quiz result ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully updated quiz result',
    type: QuizResultResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuizResultDto: UpdateQuizResultDto,
  ) {
    return this.quizResultService.update(id, updateQuizResultDto);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete quiz result by ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter quiz result ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted quiz result',
    type: QuizResultResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizResultService.remove(id);
  }
}
