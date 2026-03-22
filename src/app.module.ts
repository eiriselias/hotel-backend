import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HuespedModule } from './huesped/huesped.module';

@Module({
  imports: [PrismaModule, HuespedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
