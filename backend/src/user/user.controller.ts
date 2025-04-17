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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { UserGuard } from 'src/auth/guard/user.guard';

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

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users found successfully',
    type: UserResponseDto,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(UserGuard)
  @ApiOperation({
    summary: 'Get ranking for all users or single user (depends of role)',
  })
  @ApiResponse({
    status: 200,
    description: 'User/Users ranking found successfully',
  })
  @Get('ranking')
  getRanking(@Req() request: any) {
    const user = request.user;
    return this.userService.getRanking(request.user);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get unique user by ID in request params' })
  @ApiResponse({
    status: 200,
    description: 'User found successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @Get('me')
  findOne(@Req() request: any) {
    const userId = request.user.userId;
    return this.userService.findOne(userId);
  }

  @UseGuards(UserGuard)
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

  @UseGuards(AdminGuard)
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
