import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Wordasdasl33!';
  }
  getHi(): string {
    return 'Hello hi!';
  }
}
