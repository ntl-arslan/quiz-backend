import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';


@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('all')
  getAllQuestions() {
    return this.questionsService.getAllQuestions();
  }
}
