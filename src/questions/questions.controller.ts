import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';


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
	@Get('getQuestionByStackID/:id')
	getStackByID(@Param('id') id: string) {
		return this.questionsService.getQuestionByStackID(id);
	}
	@Post('createQuestionAgainstStack')
		createStack(@Body() createQuestionDto: CreateQuestionDto) {
			return this.questionsService.createQuestionAgainstStack(createQuestionDto);
		}
		@Put('deleteQuestionsAgainstStack/:id')
			deleteStack(@Param('id') id: string) {
				return this.questionsService.deleteQuestionsAgainstStack(id);
			}
}
