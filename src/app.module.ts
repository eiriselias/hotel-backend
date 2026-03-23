import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HuespedModule } from './huesped/huesped.module';
import { ProductoModule } from './producto/producto.module';
import { HabitacionModule } from './habitacion/habitacion.module';

@Module({
  imports: [PrismaModule, HuespedModule, ProductoModule, HabitacionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
