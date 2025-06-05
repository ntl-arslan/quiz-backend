import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Stack } from '../stacks/entities/stack.entity';

@Module({
	 imports: [TypeOrmModule.forFeature([Question,Stack])],
	controllers: [QuestionsController],
	providers: [QuestionsService],
})
export class QuestionsModule {}
