import { Module } from '@nestjs/common';
import { HabitacionService } from './habitacion.service';
import { HabitacionController } from './habitacion.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [HabitacionController],
  providers: [HabitacionService],
  imports: [PrismaModule]
})
export class HabitacionModule {}
