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

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(UserAvatar.name) private UserAvatarModel: Model<UserAvatar>,
    private readonly bcryptService: BcryptService,
  ) {}

  async createUser(createUserDto: CreateUserDto, avatar: MemoryStorageFile[]): Promise<UserDto> {
    let existingUser = await this.UserModel.findOne({ email: createUserDto.email });
    if (existingUser) throw new ConflictException('User with email already exists');
    let generatedId = this.generateId();
    this.uploadUserAvatar(generatedId, avatar);
    throw new BadRequestException();
    let user = new this.UserModel({
      ...createUserDto,
      id: generatedId,
      password: await this.bcryptService.hash(createUserDto.password),
    });
    return new UserDto(await user.save());
  }

  async getUser(id: string): Promise<UserDto> {
    let user = await this.UserModel.findOne({ id }).exec();
    if (!user) throw new NotFoundException('User not found');
    let userAvatar = await this.getUserAvatar(user.id);
    let userDto = new UserDto(user);
    if (userAvatar) userDto.avatar = userAvatar.file;
    return userDto;
  }

  async getAllUsers(): Promise<UserDto[]> {
    let users = await this.UserModel.find().exec();
    return users.map(u => new UserDto(u));
  }

  async removeUser(id: string): Promise<ApiResponseDto> {
    await this.UserModel.deleteOne({ id });
    return new ApiResponseDto('User deleted');
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
    return ID + new Date().getMilliseconds();
  }

  private async uploadUserAvatar(userId: string, avatar: MemoryStorageFile[]) {
    console.log(userId, avatar);
  }

  async getUserAvatar(userId: string): Promise<UserAvatar> {
    return await this.UserAvatarModel.findOne({ userId });
  }

  private convertToBase64(file: any) {

  }
}
