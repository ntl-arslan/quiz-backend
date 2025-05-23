import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stack } from './entities/stack.entity';
import { Repository } from 'typeorm';
import { CreateStackDto } from './dto/create-stack.dto';

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
  async allActiveStacks() {
    try {
      const allActiveStacks = await this.stackRepo.find({
        where: {
          status: 'active',
        },
      });

      if (allActiveStacks.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'All Active Stacks fetched successfully.',
          data: allActiveStacks,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.OK,
          message: 'No Active Stacks found.',
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

  async createStack(createStackDto: CreateStackDto) {
    try {
      const isAlrExists = await this.stackRepo.findOne({
        where: {
          name: createStackDto.name,
        },
      });
      if (isAlrExists) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.OK,
          message: 'Stack already exists.',
          data: [],
        };
      } else {
        const payload = {
          ...createStackDto,
          datetime: new Date(),
          modifiedDatetime: new Date(),
        };
        const newStack = await this.stackRepo.save(payload);
        if (newStack) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.CREATED,
            message: 'Stack created successfully.',
            data: newStack,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.CREATED,
            message: 'Stack not created.',
            data: [],
          };
        }
      }
    } catch (error) {
      return {
        status: 'ERROR',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Failed to create stack.',
        data: [],
      };
    }
  }
}
