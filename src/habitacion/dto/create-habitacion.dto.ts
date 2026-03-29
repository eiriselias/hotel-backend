import { Tipo } from "@prisma/client"
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsUUID, IsBoolean, IsString, IsArray } from "class-validator";

export class CreateHabitacionDto {

    @ApiProperty({ example: 101 })
    @IsNumber()
    numeroHabitacion: number

    @ApiProperty({ example: 2 })
    @IsNumber()
    capacidad: number

    @ApiProperty({ 
        enum: Tipo, 
        example: Tipo.Junior,
        description: 'Tipo de habitacion (Junior, Junior_decorada, Presidencial, Presidencial_decorada)' 
      })
      @IsEnum(Tipo, {
        message: 'El tipo debe ser: Junior, Junior_decorada, Presidencial o Presidencial_decorada'
      })
    tipo: Tipo

    @ApiProperty({ example: 40000 })
    @IsNumber()
    precio: number

    @ApiProperty({ example: false })
    @IsBoolean()
    ocupado: boolean

    @ApiProperty({ example: false })
    @IsBoolean()
    jacuzzi: boolean

    @ApiProperty({ example: true })
    @IsBoolean()
    aireAcondicionado: boolean

    @ApiProperty({
      example:["https://i.pinimg.com/736x/15/a6/56/15a6569a481c9aad60cd0925b278ffb1.jpg"],
      description:"Lista de URLs de las imagenes de la habitacion",
      type:[String]
    })
    @IsOptional()
    @IsArray({message:"imagenes deben ser un arreglo de strings"})
    @IsString({each:true, message:"Cada imagen debe ser un string valido"})
    imagenes?: string[]
}
