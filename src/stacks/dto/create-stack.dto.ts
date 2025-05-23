// src/stacks/dto/create-stack.dto.ts

import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateStackDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
