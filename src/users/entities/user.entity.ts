import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

@Entity('quiz_users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(6)
  password: string;

  @Column({ default: 'active' })
  @IsOptional()
  @IsString()
  status: string;

  @Column({ default: 'user' })
  @IsOptional()
  @IsString()
  role: string;

  @Column({ nullable: true, type: 'text' })
  @IsOptional()
  token?: string;

  @CreateDateColumn({ type: 'timestamp' })
  datetime: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_datetime: Date;
}
