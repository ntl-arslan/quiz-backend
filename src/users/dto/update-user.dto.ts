import {
  IsEmail,
  IsOptional,
  IsString,
  IsIn,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive'])
  status?: string;

  @IsOptional()
  @IsString()
  @IsIn(['user', 'admin'])
  role?: string;
}
