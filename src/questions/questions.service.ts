import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { Stack } from '../stacks/entities/stack.entity';

@Injectable()
export class QuestionsService {
		constructor(
			@InjectRepository(Question)
			private readonly questionRepo: Repository<Question>,
			@InjectRepository(Stack)
			private readonly stackRepo: Repository<Stack>,
			
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
	 async getQuestionByStackID(id: string) {
    try {
      const questions = await this.questionRepo.find({
        where: {
          stack: { id: parseInt(id) },
        },
        relations: ['stack'], 
      });

      if (questions.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'Questions fetched successfully.',
          data: questions,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.OK,
          message: 'No Question found.',
          data: [],
        };
      }
    } catch (err) {
      console.error('Error fetching question:', err);
      return {
        status: 'ERROR',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Failed to fetch question.',
        data: [],
      };
    }
  }
	async createQuestionAgainstStack (createQuestionDto:CreateQuestionDto) 
	{
		try
		{
			const stack = await this.stackRepo.findOne({ where: { id: createQuestionDto.stackId } });

		if (!stack) {
			return {
					status: 'FAILURE',
					httpcode: HttpStatus.OK,
					message: 'No Such Stack Exists',
					data: [],
				};
		}

		const question = this.questionRepo.create({
			question_text: createQuestionDto.question_text,
			correct_answer: createQuestionDto.correct_answer,
			difficulty: createQuestionDto.difficulty,
			choice: createQuestionDto.choice,
			status: 'active',
			stack,
		});

		const saveQuestionResponse= await this.questionRepo.save(question);
		if(saveQuestionResponse)
			{
				 return {
				status: 'SUCCESS',
				httpcode: HttpStatus.OK,
				message: 'Question Created Against Stack',
				data: saveQuestionResponse,
			};
			}
			else
			{
					 return {
				status: 'FAILURE',
				httpcode: HttpStatus.OK,
				message: 'No Question Created',
				data: [],
			};
			}
		}catch(err)
		{
			 return {
				status: 'ERROR',
				httpcode: HttpStatus.EXPECTATION_FAILED,
				message: 'Failed to create question against stack.',
				data: [],
			};
		}
	}
	
}

