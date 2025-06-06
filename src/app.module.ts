import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StacksModule } from './stacks/stacks.module';
import { QuestionsModule } from './questions/questions.module';
import { UserAnswerModule } from './user-answer/user-answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST || 'localhost',
      port: 5432,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
    UsersModule,
    AuthModule,
    StacksModule,
    QuestionsModule,
    UserAnswerModule,
  ],
})
export class AppModule {}
