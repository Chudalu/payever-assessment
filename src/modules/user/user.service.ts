import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { UserAvatar } from './entities/user-avatar.entity';
import { UserDto } from './dto/user.dto';
import { ApiResponseDto } from '../utilities/dto/api-response.dto';
import { BcryptService } from '../utilities/bcrypt/bcrypt.service';
import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { UserAvatarDto } from './dto/user-avatar.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(UserAvatar.name) private UserAvatarModel: Model<UserAvatar>,
    private readonly bcryptService: BcryptService,
  ) {}

  async createUser(createUserDto: CreateUserDto, avatar: MemoryStorageFile[]): Promise<UserDto> {
    if (await this.UserModel.findOne({ email: createUserDto.email })) 
    throw new ConflictException('User with email already exists');
    let generatedId = this.generateId();
    let user = new this.UserModel({
      ...createUserDto, id: generatedId,
      password: await this.bcryptService.hash(createUserDto.password),
    });
    let userDto = new UserDto(await user.save());
    if (avatar) userDto.avatar = await this.uploadUserAvatar(generatedId, avatar);
    return userDto;
  }

  async getUser(id: string): Promise<UserDto> {
    let user = await this.UserModel.findOne({ id }).exec();
    if (!user) throw new NotFoundException('User not found');
    let userDto = new UserDto(user);
    try { userDto.avatar = await this.getUserAvatar(user.id ) } 
    catch (error) { return userDto; }
    return userDto;
  }

  async getAllUsers(): Promise<UserDto[]> {
    let users = await this.UserModel.find().exec();
    return users.map(u => new UserDto(u));
  }

  async getUserAvatar(userId: string): Promise<UserAvatarDto> {
    let userAvatar = await this.UserAvatarModel.findOne({ userId });
    if (!userAvatar) throw new NotFoundException('Avatar not found');
    return new UserAvatarDto(userAvatar);
  }

  async removeUser(id: string): Promise<ApiResponseDto> {
    await this.UserAvatarModel.deleteOne({ userId: id });
    await this.UserModel.deleteOne({ id });
    return new ApiResponseDto('User deleted');
  }

  async removeUserAvatar(userId: string): Promise<ApiResponseDto> {
    await this.UserAvatarModel.deleteOne({ userId });
    return new ApiResponseDto('Avatar deleted');
  }

  private generateId(length?: number) {
    let len = length || 10;
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let charactersLength = chars.length;
    let ID = '';
    for (let i = 0; i < len; i++) {
        let index = Math.random() * charactersLength;
        ID += chars.charAt(index);
    }
    return ID + Date.now();
  }

  private async uploadUserAvatar(userId: string, avatar: MemoryStorageFile[]): Promise<UserAvatarDto> {
    let userAvatar = new this.UserAvatarModel({
      userId,
      size: avatar[0].size,
      mimeType: avatar[0].mimetype,
      fileBase64: avatar[0].buffer.toString('base64'),
    });
    return new UserAvatarDto(await userAvatar.save())
  }

}
