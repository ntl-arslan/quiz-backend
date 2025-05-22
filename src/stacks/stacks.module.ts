import { Module } from '@nestjs/common';
import { StacksService } from './stacks.service';
import { StacksController } from './stacks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stack } from './entities/stack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stack])],
  controllers: [StacksController],
  providers: [StacksService],
})
export class StacksModule {}
