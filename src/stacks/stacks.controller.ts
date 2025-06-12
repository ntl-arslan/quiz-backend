import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Put,
	UseGuards,
} from '@nestjs/common';
import { StacksService } from './stacks.service';
import { CreateStackDto } from './dto/create-stack.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('stacks')
//@UseGuards(JwtAuthGuard)
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

	@Get('getStackByID/:id')
	getStackByID(@Param('id') id: string) {
		return this.stacksService.getStackByID(id);
	}

	@Put('updateStack/:id')
	updateStack(@Body() updateStackDto: CreateStackDto, @Param('id') id: string) {
		return this.stacksService.updateStack(id, updateStackDto);
	}

	@Put('deleteStack/:id')
	deleteStack(@Param('id') id: string) {
		return this.stacksService.deleteStack(id);
	}

	@Post('createStack')
	createStack(@Body() createStackDto: CreateStackDto) {
		return this.stacksService.createStack(createStackDto);
	}
}
