import { UserAnswer } from '../../user-answer/entities/user-answer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';


@Entity('quiz_users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'text' , nullable:true})
  password: string;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: string;

  @Column({ type: 'varchar', length: 20, default: 'user' })
  role: string;

  @Column({ type: 'text', nullable: true })
  token: string;

  @CreateDateColumn({ type: 'timestamp' })
  datetime: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  modified_datetime: Date;

  @OneToMany(() => UserAnswer, (answer) => answer.user)
  answers: UserAnswer[];
}
