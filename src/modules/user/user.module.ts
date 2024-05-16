import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserAvatar, UserAvatarSchema } from './entities/user-avatar.entity';
import { UtilitiesModule } from '../utilities/utilities.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, },
      { name: UserAvatar.name, schema: UserAvatarSchema, }
    ]),
    UtilitiesModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
