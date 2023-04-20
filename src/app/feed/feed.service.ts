import { PrismaService } from './../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';

@Injectable()
export class FeedService {
  constructor(private prisma: PrismaService) {}

  create(createFeedDto: CreateFeedDto) {
    return 'This action adds a new feed';
  }

  findAll(tenant_id: number) {
    return this.prisma.feed.findMany({
      where: {
        status: {
          equals: 'Ativo',
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} feed`;
  }

  update(id: number, updateFeedDto: UpdateFeedDto) {
    return `This action updates a #${id} feed`;
  }

  remove(id: number) {
    return `This action removes a #${id} feed`;
  }
}
