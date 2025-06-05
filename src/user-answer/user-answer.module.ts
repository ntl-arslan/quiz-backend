import { Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { UserAnswerController } from './user-answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../questions/entities/question.entity';
import { Stack } from '../stacks/entities/stack.entity';
import { UserAnswer } from '../user-answer/entities/user-answer.entity';

@Module({
	 imports: [TypeOrmModule.forFeature([Question,Stack,UserAnswer])],
	controllers: [UserAnswerController],
	providers: [UserAnswerService],
})
export class UserAnswerModule {}
