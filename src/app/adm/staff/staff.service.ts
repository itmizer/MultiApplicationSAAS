import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}
  create(createStaffDto: CreateStaffDto) {
    return 'This action adds a new staff';
  }

  async findAll(tentant_id: number) {
    const persons = await this.prisma.person.findMany({
      where: {
        profile: 'STAFF',
      },
      select: {
        idPerson: true,
        name: true,
        cargo: true,
        profile: true,
        tenant_id: true,
      },
    });

    return persons;
  }

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
