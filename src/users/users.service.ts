import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getAllUsers() {
    try {
      const users = await this.userRepository.find();
      if (users.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'All Users fetched successfully.',
          data: users,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.OK,
          message: 'No Users found.',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'ERROR',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Failed to fetch users.',
        data: [],
      };
    }
  }
  async getAllActiveUsers() {
    try {
      const users = await this.userRepository.find({
        where: { status: 'active' },
        select: ['id', 'username', 'email', 'status', 'role', 'datetime'],
      });
      if (users.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'All Active Users fetched successfully.',
          data: users,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.OK,
          message: 'No Active Users found.',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'ERROR',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Failed to fetch users.',
        data: [],
      };
    }
  }
  async getUserByID(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id } as any,
        select: ['id', 'username', 'email', 'status', 'role', 'datetime'],
      });
      if (user) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'User fetched successfully.',
          data: user,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.OK,
          message: 'No User found.',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'ERROR',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Failed to fetch users.',
        data: [],
      };
    }
  }
  async getUserByUserName(userName: string) {
    try {
      console.log(userName, 'userName');
      const user = await this.userRepository.findOne({
        where: { username: userName } as any,
        select: ['id', 'username', 'email', 'status', 'role', 'datetime'],
      });
      if (user) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'User fetched successfully.',
          data: user,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.OK,
          message: 'No User found.',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'ERROR',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Failed to fetch users.',
        data: [],
      };
    }
  }
  async deleteUser(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id } as any,
      });
      if (user) {
        user.status = 'inactive';
        await this.userRepository.update(id, {
          status: 'inactive',
          modified_datetime: new Date(),
        });

        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'User deleted successfully.',
          data: [],
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.OK,
          message: 'No User found.',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'ERROR',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Failed to delete user.',
        data: [],
      };
    }
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id } as any,
      });
      if (user) {
        const updatedUser = await this.userRepository.update(id, {
          ...updateUserDto,
          modified_datetime: new Date(),
        });
        if (updatedUser.affected > 0) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.OK,
            message: 'User updated successfully.',
            data: [],
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.OK,
            message: 'Failed to update user.',
            data: [],
          };
        }
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.OK,
          message: 'No User found.',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'ERROR',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Failed to update user.',
        data: [],
      };
    }
  }
}
