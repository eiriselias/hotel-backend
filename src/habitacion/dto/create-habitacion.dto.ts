import { Tipo } from "@prisma/client"
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsUUID, IsBoolean } from "class-validator";

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
}
