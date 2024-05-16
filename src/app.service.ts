import { Injectable } from '@nestjs/common';
import { ApiResponseDto } from './modules/utilities/dto/api-response.dto';

@Injectable()
export class AppService {
  
  constructor() {}
  
  getHealth(): ApiResponseDto {
    return new ApiResponseDto('Server is healthy');
  }
}
