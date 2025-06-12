import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
import { UpdateUserAnswerDto } from './dto/update-user-answer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user-answer')
//@UseGuards(JwtAuthGuard)
export class UserAnswerController {
	constructor(private readonly userAnswerService: UserAnswerService) {}

 @Post('PostUserAnswer')
	 PostUserAnswer(@Body() createQuestionDto: CreateUserAnswerDto) {
		 return this.userAnswerService.PostUserAnswer(createQuestionDto);
	 }
}
