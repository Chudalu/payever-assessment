import { UserAvatar } from "../entities/user-avatar.entity";

export class UserAvatarDto {
    size: number;
    url: string;

    constructor(userAvatar: UserAvatar) {
        this.size = userAvatar.size;
        this.url = `data:${userAvatar.mimeType};base64, ${ userAvatar.fileBase64}`;
    }
}