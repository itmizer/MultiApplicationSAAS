import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuAppDto } from './dto/menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}
  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu';
  }

  async findAll(menuDTO: MenuAppDto) {
    console.log(menuDTO.tenant_id);

    const menu = await this.prisma.menuApp.findMany({
      where: {
        tenant_id: menuDTO.tenant_id,
        role: menuDTO.profile,
      },
    });

    return menu;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
