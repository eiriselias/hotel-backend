import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, IsDateString, IsUUID, IsArray } from "class-validator";

export class CreateHuespedDto {

    @ApiProperty({ example: 'Eiris' })
    @IsString()
    nombres: string;

    @ApiProperty({ example: 'Salazar' })
    @IsString()
    apellidos: string;

    @ApiProperty({ example: 12345678 })
    @IsNumber()
    numeroDocumento: number;

    @ApiProperty({ required: false, example: '1990-10-13T00:00:00.000Z' })
    @IsOptional()
    @IsDateString() // Prisma espera un formato de fecha válido
    fechaNacimiento?: Date;

    @ApiProperty({ required: false, description: 'ID de la habitación si es el titular' })
    @IsOptional()
    @IsUUID()
    habitacionId?: string;

    @ApiProperty({ required: false, description: 'ID del responsable si es el titular' })
    @IsOptional()
    @IsUUID()
    responsableId?: string;

    @ApiProperty({ required: false})
    @IsOptional()
    @IsArray()
    @IsUUID("4", { each: true })
    acompanantesIds?: string[];
}