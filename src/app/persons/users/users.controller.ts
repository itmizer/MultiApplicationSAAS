import { ApiHeader, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';

@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Codigo Empresa',
})
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Headers() headers) {
    return this.usersService.findAll(+headers.tenant_id);
  }
  @Get('/firebase')
  updateMany(@Headers() headers) {
    return this.usersService.updateMany(+headers.tenant_id);
  }
  @Get(':user')
  find(@Headers() headers, @Param('user') user: string) {
    return this.usersService.find(+headers.tenant_id, user);
  }

  // @Post(':user')
  // update(@Headers() headers, @Param('user') user: string) {
  //   return this.usersService.update(+headers.tenant_id, user);
  // }
}
