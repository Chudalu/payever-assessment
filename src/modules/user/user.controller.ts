import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { FileFieldsInterceptor, MemoryStorageFile, UploadedFiles } from '@blazity/nest-file-fastify';
import { UserAvatarDto } from './dto/user-avatar.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
  ]))
  @Post()
  createUser(@Body() createUserDto: CreateUserDto, @UploadedFiles() file: { avatar: MemoryStorageFile[]}) {
    return this.userService.createUser(createUserDto, file.avatar);
  }

  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.getUser(id);
  }

  @Get(':id/avatar')
  async getUserAvatar(@Param('id') id: string): Promise<UserAvatarDto> {
    return await this.userService.getUserAvatar(id);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return await this.userService.removeUser(id);
  }

  @Delete(':id/avatar')
  async removeUserAvatar(@Param('id') id: string) {
    return await this.userService.removeUserAvatar(id);
  }
}
