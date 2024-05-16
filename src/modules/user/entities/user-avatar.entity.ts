import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class UserAvatar {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    fileBase64: string;

    @Prop({ required: true })
    mimeType: string;

    @Prop()
    size: number;
}
export type UserAvatarDocument = HydratedDocument<UserAvatar>;
export const UserAvatarSchema = SchemaFactory.createForClass(UserAvatar);
