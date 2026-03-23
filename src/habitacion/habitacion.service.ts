import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UpdateHabitacionDto } from './dto/update-habitacion.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class HabitacionService {

  constructor(private prisma: PrismaService){}

  async create(createHabitacionDto: CreateHabitacionDto) {
    try {
      return await this.prisma.habitacion.create({data: createHabitacionDto}) 
      
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll() {
    return await this.prisma.habitacion.findMany({
      include:{
        huespedResponsable: true,
        acompanantes: true
      }
    })
  }

  async findOne(id: string) {
   
    const habitacion =  await this.prisma.habitacion.findUnique({where:{id}, include:{
      huespedResponsable:true,
      acompanantes: true
    }});

    if(!habitacion) throw new NotFoundException(`la habitacion con ID ${id} no fue encontrada`)
    return habitacion
      
  }

  async update(id: string, updateHabitacionDto: UpdateHabitacionDto) {
    try {
      return await this.prisma.habitacion.update({where:{id}, data: updateHabitacionDto});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`No se puede actualizar: Huésped ${id} no existe`);
      }
      this.handleDBErrors(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.habitacion.delete({where:{id}});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`No se puede actualizar: Huésped ${id} no existe`);
      }
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors (error: any){
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException('Ya existe un registro con ese valor único (ej: documento)');
      }
      if (error.code === 'P2003' || error.code === 'P2005' || error.code === 'P2006') {
        throw new BadRequestException('Los datos enviados no tienen el formato correcto para la base de datos');
      }
    }
    
    throw new BadRequestException('Error inesperado al procesar la solicitud');
  }
}
