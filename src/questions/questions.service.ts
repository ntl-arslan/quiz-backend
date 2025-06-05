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
		if(questionsResponse.length>0)
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
async getAllActiveQuestions () 
{
	try
	{
				const activeQuestionsResponse=await this.questionRepo.find(
					{
						where:
						{
							status:'active'
						}
					});
		if(activeQuestionsResponse.length>0)
			{
				 return {
					status: 'SUCCESS',
					httpcode: HttpStatus.OK,
					message: 'All Active Questions fetched successfully.',
					data: activeQuestionsResponse,
				};
			}else
			{
				 return {
					status: 'FAILURE',
					httpcode: HttpStatus.OK,
					message: 'No Active Questions Fetched',
					data: [],
				};
			}
	}catch(err)
	{
				 return {
						status: 'ERROR',
						httpcode: HttpStatus.EXPECTATION_FAILED,
						message: 'Failed to fetch active questions.',
						data: [],
					};
	}
	}
	
	async getQuestionsByName (name:string)
	{
		try
		{
			const getQuestionByNameRes=await this.questionRepo.find(
					{
						where:
						{
							name:name
						} as unknown
					});
		if(getQuestionByNameRes.length>0)
			{
				 return {
					status: 'SUCCESS',
					httpcode: HttpStatus.OK,
					message: 'All Active Questions fetched successfully.',
					data: getQuestionByNameRes,
				};
			}else
			{
				 return {
					status: 'FAILURE',
					httpcode: HttpStatus.OK,
					message: 'No Active Questions Fetched',
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

