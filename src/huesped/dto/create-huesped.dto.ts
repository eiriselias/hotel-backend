import { ApiProperty } from "@nestjs/swagger";

export class CreateHuespedDto {

    @ApiProperty({required:true})
    nombres:   string   

    @ApiProperty({required:true})
    apellidos: string

    @ApiProperty({required:true})
    numeroDocumento: number

    @ApiProperty({required:false})
    fechaNacimiento: Date
}
