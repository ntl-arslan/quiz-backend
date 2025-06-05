import { IsNotEmpty, IsString, IsEnum, IsObject, IsIn } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  stackId: number;

  @IsNotEmpty()
  @IsString()
  question_text: string;

  @IsNotEmpty()
  @IsString()
  correct_answer: string;

  @IsNotEmpty()
  @IsEnum(['Easy', 'Medium', 'Hard'])
  difficulty: 'Easy' | 'Medium' | 'Hard';

  @IsNotEmpty()
  @IsObject()
  choice: Record<string, string>;
}

