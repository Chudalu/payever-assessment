import { IsString, IsEmail, MaxLength, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(100)
    firstName: string;

    @IsString()
    @MaxLength(100)
    lastName: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({ minLength: 8 })
    password: string;
}
