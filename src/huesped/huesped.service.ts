import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHuespedDto } from './dto/create-huesped.dto';
import { UpdateHuespedDto } from './dto/update-huesped.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class HuespedService {

  constructor(private prisma: PrismaService){}

  async create(createHuespedDto: CreateHuespedDto) {
    try {
      const {fechaNacimiento, ...data } = createHuespedDto
      return await this.prisma.huesped.create({data:{
        ...data,
        fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : null
      }});
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll() {
    return await this.prisma.huesped.findMany();
  }

  async findOne(id: string) {
    
      const huesped = await this.prisma.huesped.findUnique({where:{id}});
      if(!huesped) throw new NotFoundException(`el huesped con ID ${id} no fue encontrado`)
      return huesped
    
  }

  async update(id: string, updateHuespedDto: UpdateHuespedDto) {
    try {
      return await this.prisma.huesped.update({where:{id}, data: updateHuespedDto})
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`No se puede actualizar: Huésped ${id} no existe`);
      }
      this.handleDBErrors(error);
    }
    
  }

  async remove(id: string) {
    try {
      return await this.prisma.huesped.delete({where:{id}})
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`No se puede eliminar: Huésped ${id} no existe`);
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
