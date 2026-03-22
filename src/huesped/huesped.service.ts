import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHuespedDto } from './dto/create-huesped.dto';
import { UpdateHuespedDto } from './dto/update-huesped.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HuespedService {

  constructor(private prisma: PrismaService){}

  create(createHuespedDto: CreateHuespedDto) {
    return this.prisma.huesped.create({data: createHuespedDto});
  }

  findAll() {
    return this.prisma.huesped.findMany();
  }

  findOne(id: string) {
    try {
      return this.prisma.huesped.findUnique({where:{id}});
    } catch (error) {
      throw new NotFoundException("no se encontro el huesped")
    }
  }

  update(id: string, updateHuespedDto: UpdateHuespedDto) {
    try {
      return this.prisma.huesped.update({where:{id}, data: updateHuespedDto})
    } catch (error) {
      throw new NotFoundException("no se encontro el huesped")
    }
    
  }

  remove(id: string) {
    try {
      return this.prisma.huesped.delete({where:{id}})
    } catch (error) {
      throw new NotFoundException("no se encontro el huesped")
    }
  }
}
