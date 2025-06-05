import { Stack } from '../../stacks/entities/stack.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';


@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Stack, (stack) => stack.questions, { onDelete: 'CASCADE' })
  stack: Stack;

  @Column({ type: 'text' })
  question_text: string;

  @Column({ type: 'varchar', length: 10 })
  correct_answer: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  difficulty: 'Easy' | 'Medium' | 'Hard';

  @Column({ type: 'jsonb' })
  choice: Record<string, string>;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  datetime: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  modified_datetime: Date;
}

