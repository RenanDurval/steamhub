import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // Enable CORS for mobile app access
    app.enableCors();
    await app.listen(3333);
    console.log('StreamHub API running on http://localhost:3333');
}
bootstrap();
