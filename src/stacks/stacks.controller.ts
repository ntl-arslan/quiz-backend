import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
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

  @Put('updateStack/:id')
  updateStack(@Body() updateStackDto: CreateStackDto, @Param('id') id: string) {
    return this.stacksService.updateStack(id, updateStackDto);
  }

  @Put('updateStack/:id')
  deleteStack(@Param('id') id: string) {
    return this.stacksService.deleteStack(id);
  }

  @Post('createStack')
  createStack(@Body() createStackDto: CreateStackDto) {
    return this.stacksService.createStack(createStackDto);
  }
}
