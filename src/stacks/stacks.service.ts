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
  async getStackByName(name: string) {
    try {
      const stack = await this.stackRepo.findOne({
        where: {
          name: name,
        },
      });
      if (stack) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'Stack fetched successfully.',
          data: stack,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.OK,
          message: 'No Stack found.',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'ERROR',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Failed to fetch stack.',
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
  async updateStack(id: string, updateStackDto: CreateStackDto) {
    try {
      const stack = await this.stackRepo.findOne({
        where: {
          id: id,
        } as unknown,
      });
      if (!stack) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.OK,
          message: 'Stack not found.',
          data: [],
        };
      } else {
        const payload = {
          ...updateStackDto,
          modifiedDatetime: new Date(),
        };
        const updatedStack = await this.stackRepo.update(id, payload);
        if (updatedStack) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.OK,
            message: 'Stack updated successfully.',
            data: updatedStack,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.OK,
            message: 'Stack not updated.',
            data: [],
          };
        }
      }
    } catch (err) {
      return {
        status: 'ERROR',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Failed to update stack.',
        data: [],
      };
    }
  }
  async deleteStack(id: string) {
    try {
      const isStackExists = await this.stackRepo.findOne({
        where: {
          id: id,
        } as unknown,
      });
      if (!isStackExists) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.OK,
          message: 'Stack not found.',
          data: [],
        };
      } else {
        const payload = {
          status: 'inactive',
          modifiedDatetime: new Date(),
        };
        const updatedStack = await this.stackRepo.update(id, payload);
        if (updatedStack) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.OK,
            message: 'Stack deleted successfully.',
            data: updatedStack,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.OK,
            message: 'Stack not deleted.',
            data: [],
          };
        }
      }
    } catch (err) {
      return {
        status: 'ERROR',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Failed to delete stack.',
        data: [],
      };
    }
  }
}
