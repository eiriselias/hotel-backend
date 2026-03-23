import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Remueve propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían datos extra que no pertenecen al DTO
      transform: true,            // Convierte automáticamente los tipos (ej: string a number en el ID)
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Hotel DB')
    .setDescription('backend de la aplicacion hotel')
    .setVersion('0.1')
    .build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
