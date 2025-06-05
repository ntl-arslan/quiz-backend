import { IsOptional, IsString, IsIn, IsObject } from 'class-validator';

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  question_text?: string;

  @IsOptional()
  @IsString()
  correct_answer?: string;

  @IsOptional()
  @IsIn(['Easy', 'Medium', 'Hard'])
  difficulty?: 'Easy' | 'Medium' | 'Hard';

  @IsOptional()
  @IsObject()
  choice?: Record<string, string>;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string;
}
