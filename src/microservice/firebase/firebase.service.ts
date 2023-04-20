import { Injectable } from '@nestjs/common';
import { CreateFirebaseDto } from './dto/create-firebase.dto';
import { UpdateFirebaseDto } from './dto/update-firebase.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class FirebaseService {
  constructor(private prisma: PrismaService) {}
  async create(create: CreateFirebaseDto) {
    return this.prisma.firebaseConfig.create({
      data: create,
    });
    return 'This action adds a new firebase';
  }

  findAll() {
    return `This action returns all firebase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} firebase`;
  }

  update(id: number, updateFirebaseDto: UpdateFirebaseDto) {
    return `This action updates a #${id} firebase`;
  }

  remove(id: number) {
    return `This action removes a #${id} firebase`;
  }
}
