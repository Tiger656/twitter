import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CreateUserDto } from './user/dto/create-user.dto';
import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //await app.listen(3000);

  const config = new DocumentBuilder()
    .setTitle('Weather app on TypeScript')
    .setDescription('The Weather API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
      },
      'Token',
    )
    .build();
  mongoose.set('debug', true)
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
 
  const port = process.env.PORT || 3000;
  if (process.env.PORT) {
    await app.listen(port, '0.0.0.0');
    Logger.log(
      `Server running on ${port}`,
      `Bootstrap`
    )
  } else { 
    await app.listen(port);
  }
  
}
bootstrap();
