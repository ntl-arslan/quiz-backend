import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
app.use(cookieParser());
	// Enable CORS
app.enableCors({
  origin: [
    'https://quiz-app-rust-xi.vercel.app',
    'http://localhost:3000',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
});

	await app.listen(3000);
}
bootstrap();
