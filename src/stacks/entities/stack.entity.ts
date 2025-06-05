import { Question } from '../../questions/entities/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';


@Entity('stacks')
export class Stack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  datetime: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  modified_datetime: Date;

  @OneToMany(() => Question, (question) => question.stack, { cascade: true })
  questions: Question[];
}
