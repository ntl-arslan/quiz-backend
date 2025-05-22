// src/stacks/entities/stack.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('quiz_stacks')
export class Stack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'datetime' })
  datetime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'modified_datetime',
    nullable: true,
  })
  modifiedDatetime?: Date;
}
