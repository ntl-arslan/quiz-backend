import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService,
	) {}
	async signup(createUserDto: CreateUserDto) {
		try {
			const { username, email, password } = createUserDto as any;

			// Check if user already exists
			const existingUser = await this.userRepository.findOne({
				where: [{ email }, { username }],
			});
			if (existingUser) {
				return {
					status: 'ERROR',
					httpcode: HttpStatus.CONFLICT,
					message: 'User with this email or username already exists.',
					data: [],
				};
			}

			// Hash the password
			const hashedPassword = await bcrypt.hash(password, 10);

			// Create the user
			const newUser = this.userRepository.create({
				username,
				email,
				password: hashedPassword,
				status: 'active',
				role: 'user',
				datetime: new Date(),
				modified_datetime: new Date(),
			});

			const savedUser = await this.userRepository.save(newUser);

			// Remove password from response
			const { password: _, ...userWithoutPassword } = savedUser;

			return {
				status: 'SUCCESS',
				httpcode: HttpStatus.OK,
				message: 'User Profile created successfully.',
				data: userWithoutPassword,
			};
		} catch (err) {
			console.log(err);
			return {
				status: 'ERROR',
				httpcode: HttpStatus.EXPECTATION_FAILED,
				message: 'Failed to create user profile.',
				data: [],
			};
		}
	}
	async login(createLoginAuthDto: LoginUserDto, res: any) { // Add res parameter
		try {
			const { email, password } = createLoginAuthDto;

			const user = await this.userRepository.findOne({ where: { email } });

			if (!user) {
				return {
					status: 'ERROR',
					httpcode: HttpStatus.UNAUTHORIZED,
					message: 'Invalid email or password.',
					data: [],
				};
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return {
					status: 'ERROR',
					httpcode: HttpStatus.UNAUTHORIZED,
					message: 'Invalid email or password.',
					data: [],
				};
			}

			// Generate JWT token
			const payload = {
				sub: user.id,
				email: user.email,
				role: user.role,
			};

			const token = this.jwtService.sign(payload);

			user.token = token;
			await this.userRepository.save(user);

			const { password: _, ...userWithoutPassword } = user;

			// Set cookie
			res.cookie('access_token', token, {
				httpOnly: true,
				sameSite: 'None', 
				secure: process.env.NODE_ENV === 'production', 
				maxAge: 24 * 60 * 60 * 1000, 
				path: '/',
			}) ;

			return {
				status: 'SUCCESS',
				httpcode: HttpStatus.OK,
				message: 'Login successful.',
				data: userWithoutPassword,
			};
		} catch (err) {
			console.log(err);
			return {
				status: 'ERROR',
				httpcode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: 'Failed to login.',
				data: [],
			};
		}
	}
}
