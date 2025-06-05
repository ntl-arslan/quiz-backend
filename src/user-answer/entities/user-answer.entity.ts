import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Question } from '../../questions/entities/question.entity';

@Entity('quiz_users_answers')
export class UserAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.answers, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Question, (question) => question.answers, { onDelete: 'CASCADE' })
  question: Question;

  @Column({ type: 'boolean', nullable: true })
  is_correct: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  datetime: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  modified_datetime: Date;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: string;
}
