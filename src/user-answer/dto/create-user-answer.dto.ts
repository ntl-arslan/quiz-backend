import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserAnswerDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  question_id: number;

  @IsEnum(['A', 'B', 'C', 'D'], {
    message: 'Choice must be one of A, B, C, or D',
  })
  @IsNotEmpty()
  choice: 'A' | 'B' | 'C' | 'D';
}
