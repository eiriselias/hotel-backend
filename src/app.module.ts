import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HuespedModule } from './huesped/huesped.module';
import { ProductoModule } from './producto/producto.module';
import { HabitacionModule } from './habitacion/habitacion.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, HuespedModule, ProductoModule, HabitacionModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
