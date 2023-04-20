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
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { UserNotificationDto } from './dto/user-notification.dto';
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'codigo empresa',
})
@Controller('notification')
@ApiTags('notificacoes')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAll(@Headers() headers) {
    return this.notificationsService.findAll(+headers.tenant_id);
  }
  @Post('user')
  findUser(@Headers() headers, @Body() user: UserNotificationDto) {
    return this.notificationsService.findUser(+headers.tenant_id, user);
  }

  @Post('closed')
  closedUser(@Headers() headers, @Body() user: UserNotificationDto) {
    return this.notificationsService.closedUser(+headers.tenant_id, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }
  @Get('closed/:id')
  closed(@Headers() headers, @Param('id') id: string) {
    return this.notificationsService.closed(+id, +headers.tenant_id);
  }

  @Get('read/:id')
  read(@Headers() headers, @Param('id') id: string) {
    return this.notificationsService.closed(+id, +headers.tenant_id);
  }

  @Patch(':code')
  update(
    @Param('code') code: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(+code, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
