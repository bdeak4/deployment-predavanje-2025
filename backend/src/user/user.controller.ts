import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserResponseDto } from './dto/create-user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({
    description: 'User data to create a new user',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created quiz',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Quiz with this name already exists',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users found successfully' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get unique user by ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter user ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'User found successfully',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiBody({
    description: 'User data to update a user',
    type: UpdateUserDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Enter user ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully updated quiz',
    type: CreateUserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter user ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully deleted user',
    type: CreateUserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
