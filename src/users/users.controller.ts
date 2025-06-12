import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
//@UseGuards(JwtAuthGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	//@UseGuards(JwtAuthGuard)
	@Get('all')
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@Get('allActiveUsers')
	getAllActiveUsers() {
		return this.usersService.getAllActiveUsers();
	}
	@Get(':id')
	getUserByID(@Param('id') id: string) {
		return this.usersService.getUserByID(id);
	}
	@Get('username/:usrname')
	getUserByUserName(@Param('usrname') usrname: string) {
		return this.usersService.getUserByUserName(usrname);
	}
	@Put('deleteUser/:id')
	deleteUser(@Param('id') id: string) {
		return this.usersService.deleteUser(id);
	}
	@Put('updateUser/:id')
	updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.updateUser(id, updateUserDto);
	}
}
