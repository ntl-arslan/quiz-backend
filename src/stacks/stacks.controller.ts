import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StacksService } from './stacks.service';
import { CreateStackDto } from './dto/create-stack.dto';

@Controller('stacks')
export class StacksController {
  constructor(private readonly stacksService: StacksService) {}

  @Get('all')
  getAllStacks() {
    return this.stacksService.getAllStacks();
  }
  @Get('allActiveStacks')
  allActiveStacks() {
    return this.stacksService.allActiveStacks();
  }
  @Get('getStackByName/:name')
  getStackByName(@Param('name') name: string) {
    return this.stacksService.getStackByName(name);
  }

  @Post('createStack')
  createStack(@Body() createStackDto: CreateStackDto) {
    return this.stacksService.createStack(createStackDto);
  }
}
