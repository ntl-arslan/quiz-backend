import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';


@Controller('questions')
export class QuestionsController {
	constructor(private readonly questionsService: QuestionsService) {}

	@Get('all')
	getAllQuestions() {
		return this.questionsService.getAllQuestions();
	}
	 @Get('getAllActiveQuestions')
	getAllActiveQuestions() {
		return this.questionsService.getAllActiveQuestions();
	}
	@Get('getQuestionsByName/:name')
  getStackByName(@Param('name') name: string) {
    return this.questionsService.getQuestionsByName(name);
  }
}
