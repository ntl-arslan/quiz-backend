import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
		constructor(
			@InjectRepository(Question)
			private readonly questionRepo: Repository<Question>,
		) {}
		
async getAllQuestions () 
{
	try
	{
		const questionsResponse=await this.questionRepo.find();
		if(questionsResponse)
			{
				 return {
					status: 'SUCCESS',
					httpcode: HttpStatus.OK,
					message: 'All Questions fetched successfully.',
					data: questionsResponse,
				};
			}else
			{
				 return {
					status: 'FAILURE',
					httpcode: HttpStatus.OK,
					message: 'No Questions Fetched',
					data: [],
				};
			}
	}catch(err)
	{
		 return {
						status: 'ERROR',
						httpcode: HttpStatus.EXPECTATION_FAILED,
						message: 'Failed to fetch questions.',
						data: [],
					};
	}
}
}
