import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UserAvatar } from './entities/user-avatar.entity';
import { FileFieldsInterceptor, MemoryStorageFile, UploadedFiles } from '@blazity/nest-file-fastify';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
  ]))
  @Post()
  create(@Body() createUserDto: CreateUserDto, @UploadedFiles() file: { avatar: MemoryStorageFile[]}) {
    return this.userService.createUser(createUserDto, file.avatar);
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.getUser(id);
  }

  @Get(':id/avatar')
  async getUserAvatar(@Param('id') id: string): Promise<UserAvatar> {
    return await this.userService.getUserAvatar(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.removeUser(id);
  }
}
