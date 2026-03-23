import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Huesped } from 'src/huesped/entities/huesped.entity';

@Injectable()
export class ProductoService {

  constructor(private prisma: PrismaService){}

  async create(createProductoDto: CreateProductoDto) {

    const {cantidadSolicitada, existencia, nombreProducto} = createProductoDto
    
    if(cantidadSolicitada){
    if ( cantidadSolicitada > existencia) {
      throw new BadRequestException(
        `No se puede procesar el pedido de "${nombreProducto}". ` +
        `Solicitado: ${cantidadSolicitada}, en existencia: ${existencia}.`
      );
    }}

    try {
      const {cantidadSolicitada, ...data} = createProductoDto
      return await this.prisma.producto.create({data:{
        ...data,
        cantidadSolicitada : cantidadSolicitada ? cantidadSolicitada : 0 
      }})
      
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll() {
    return await this.prisma.producto.findMany({
      include: {huesped: true}
    })
  }

  async findOne(id: string) {
    const producto = await this.prisma.producto.findUnique({where:{id}, include:{huesped:true}})
    if(!producto) throw new NotFoundException(`el producto con el ID ${id} no fue encontrado`)
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    try {
      return await this.prisma.producto.update({where:{id}, data: updateProductoDto});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`No se puede actualizar: el producto ${id} no existe`);
      }
      this.handleDBErrors(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.producto.delete({where:{id}});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`No se puede eliminar: el producto ${id} no existe`);
      }
      this.handleDBErrors(error)
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
