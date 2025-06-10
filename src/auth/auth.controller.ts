import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @Post('login')
async login(
  @Body() loginUserDto: LoginUserDto,
  @Res({ passthrough: true }) res: Response // Add this
) {
  const result = await this.authService.login(loginUserDto, res); // Pass res to service
  return result;
}
}
