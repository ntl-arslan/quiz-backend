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

@Controller('stacks')
export class StacksController {
  constructor(private readonly stacksService: StacksService) {}

  @Get('all')
  getAllStacks() {
    return this.stacksService.getAllStacks();
  }
}
