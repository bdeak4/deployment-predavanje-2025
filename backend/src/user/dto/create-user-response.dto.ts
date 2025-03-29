import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class CreateUserResponseDto extends CreateUserDto {
  @ApiProperty({ example: 0 })
  points: number;

  @ApiProperty({ example: 'a3cd2fae-ff67-4261-9d90-217d70e4b7d2' })
  id: string;
}
