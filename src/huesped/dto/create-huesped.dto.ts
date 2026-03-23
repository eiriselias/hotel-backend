import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, IsDateString, IsUUID } from "class-validator";

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
    @IsUUID() // Valida que sea un UUID válido de Prisma
    habitacionResponsableId?: string;

    @ApiProperty({ required: false, description: 'ID de la habitación si es acompañante' })
    @IsOptional()
    @IsUUID()
    acompananteId?: string;
}