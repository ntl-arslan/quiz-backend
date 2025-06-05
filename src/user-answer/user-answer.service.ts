import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswer } from './entities/user-answer.entity';
import { Repository } from 'typeorm';
import { Question } from '../questions/entities/question.entity';
import { User } from '../users/entities/user.entity';


@Injectable()
export class UserAnswerService {
	constructor(
				@InjectRepository(UserAnswer)
				private readonly userAnswerRepo: Repository<UserAnswer>,
				
				@InjectRepository(Question)
		private readonly questionRepo: Repository<Question>,
		
		    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
	
				
			) {}
	
	
 async PostUserAnswer(createUserAnswerDto: CreateUserAnswerDto) {
		const { user_id, question_id, choice } = createUserAnswerDto;

		try {
			// 1. Check if user exists
			const user = await this.userRepo.findOne({ where: { id: user_id } });
			if (!user) {
				return {
					status: 'FAILURE',
					httpcode: HttpStatus.NOT_FOUND,
					message: 'User does not exist',
					data: [],
				};
			}

			// 2. Check if question exists
			const question = await this.questionRepo.findOne({ where: { id: question_id } });
			if (!question) {
				return {
					status: 'FAILURE',
					httpcode: HttpStatus.NOT_FOUND,
					message: 'Question does not exist',
					data: [],
				};
			}

			// 3. Check if the answer is correct
			const isCorrect = question.correct_answer === choice;

			// 4. Save answer in quiz_users_answers
			const userAnswer = this.userAnswerRepo.create({
				user,
				question,
				is_correct: isCorrect,
				datetime: new Date(),
				modified_datetime: new Date(),
				status:'active'

			});

			await this.userAnswerRepo.save(userAnswer);

			return {
				status: 'SUCCESS',
				httpcode: HttpStatus.CREATED,
				message: isCorrect
					? 'Correct answer submitted successfully'
					: 'Wrong answer submitted successfully',
				data: userAnswer,
			};
		} catch (err) {
			return {
				status: 'ERROR',
				httpcode: HttpStatus.EXPECTATION_FAILED,
				message: 'Failed to submit answer',
				data: [],
			};
		}
	}
}
