import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CreateUserDto } from './user/dto/create-user.dto';

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
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);

  const a = new CreateUserDto();
  // a.username = 'aaaaaaaaaa';
}
bootstrap();
