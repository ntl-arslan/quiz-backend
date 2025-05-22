import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stack } from './entities/stack.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StacksService {
  constructor(
    @InjectRepository(Stack)
    private readonly stackRepo: Repository<Stack>,
  ) {}
  async getAllStacks() {
    try {
      const allStacks = await this.stackRepo.find();

      if (allStacks.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'All Stacks fetched successfully.',
          data: allStacks,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.OK,
          message: 'No Stacks found.',
          data: [],
        };
      }
    } catch (error) {
      return {
        status: 'ERROR',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Failed to fetch stacks.',
        data: [],
      };
    }
  }
}
