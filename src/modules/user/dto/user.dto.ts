import { User } from "../entities/user.entity";

export class UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;

    constructor(user: User) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.lastName;
    }
}