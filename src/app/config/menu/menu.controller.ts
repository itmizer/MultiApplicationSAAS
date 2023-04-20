import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuAppDto } from './dto/menu.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Menu')
@Controller('menuApp')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('new')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }
  @Post()
  findMenu(@Body() menuApp: MenuAppDto) {
    return this.menuService.findAll(menuApp);
  }
  @Get()
  findAll() {
    // return this.menuService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.menuService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
  //   return this.menuService.update(+id, updateMenuDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.menuService.remove(+id);
  // }
}
