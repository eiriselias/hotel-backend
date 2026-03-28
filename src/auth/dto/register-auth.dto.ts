import { ApiProperty, PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    
    @ApiProperty({example: 'elias'})
    @IsString()
    @IsNotEmpty()
    name: string
}
