import { ApiProperty } from '@nestjs/swagger';

export class JwtToken {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pcmtvIiwic3ViIjoiNWYzY2EzOWEtZDkzZS00ZDAwLTlkYjMtOTUyMmYwYjk4YjIyIiwiZW1haWwiOiJtaXJrb0BnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImlhdCI6MTc0MzQ1Njc2OCwiZXhwIjoxNzQzNTQzMTY4fQ.HiOeMTOcCkbdQ_eSC-xZdoHEqcuHaI1MEo8D33uJIkg',
  })
  access_token: string;
}
