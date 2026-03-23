import { Categoria } from "@prisma/client"
import { IsString, IsNumber, IsOptional, IsUUID, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductoDto {

    @ApiProperty({ example: 'pony malta' })
    @IsString()
    nombreProducto: string

    @ApiProperty({ example: 'Bebida acompañante de comidad' })
    @IsString()
    descripcionProducto: string

    @ApiProperty({ 
        enum: Categoria, 
        example: Categoria.Bebidas,
        description: 'Categoría del producto (Bebidas, Comidas, Sexual)' 
      })
      @IsEnum(Categoria, {
        message: 'La categoría debe ser: Bebidas, Comidas o Sexual'
      })
    categoria: Categoria

    @ApiProperty({ example: 5000 })
    @IsNumber()
    precio: number

    @ApiProperty({ example: 30 })
    @IsNumber()
    existencia: number

    @ApiProperty({ example: 2 })
    @IsOptional()
    @IsNumber()
    cantidadSolicitada?: number

    @ApiProperty({ required: false, description: 'ID del huesped' })
    @IsOptional()
    @IsUUID()
    huespedId?: string
}
