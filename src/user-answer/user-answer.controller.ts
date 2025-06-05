import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
import { UpdateUserAnswerDto } from './dto/update-user-answer.dto';

@Controller('user-answer')
export class UserAnswerController {
  constructor(private readonly userAnswerService: UserAnswerService) {}

 @Post('PostUserAnswer')
   PostUserAnswer(@Body() createQuestionDto: CreateUserAnswerDto) {
     return this.userAnswerService.PostUserAnswer(createQuestionDto);
   }
}
