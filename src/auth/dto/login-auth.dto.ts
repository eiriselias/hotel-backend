import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class LoginAuthDto {
    @ApiProperty({example: 'micorreo@mail.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({example: 'security123'})
    @IsString()
    @MinLength(4)
    @MaxLength(15)
    @IsNotEmpty()
    password: string
}
