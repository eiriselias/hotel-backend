import { Module } from '@nestjs/common';
import { HuespedService } from './huesped.service';
import { HuespedController } from './huesped.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [HuespedController],
  providers: [HuespedService],
  imports: [PrismaModule]
})
export class HuespedModule {}
