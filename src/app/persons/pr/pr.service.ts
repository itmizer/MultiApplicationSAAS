import { Injectable } from '@nestjs/common';
import { CreatePrDto } from './dto/create-pr.dto';
import { UpdatePrDto } from './dto/update-pr.dto';

@Injectable()
export class PrService {
  create(createPrDto: CreatePrDto) {
    return 'This action adds a new pr';
  }

  findAll() {
    return `This action returns all pr`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pr`;
  }

  update(id: number, updatePrDto: UpdatePrDto) {
    return `This action updates a #${id} pr`;
  }

  remove(id: number) {
    return `This action removes a #${id} pr`;
  }
}
