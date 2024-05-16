import { User } from "../entities/user.entity";
import { UserAvatarDto } from "./user-avatar.dto";

export class UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: UserAvatarDto;

    constructor(user: User) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
    }
}