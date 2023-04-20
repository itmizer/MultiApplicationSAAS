import { PrismaService } from 'src/database/prisma.service';
import { NewHourWeekDto } from '../dto/new-hour-week.dto';

export interface ListGatewayInterface {
  update(id: number, updateHourDTO: NewHourWeekDto);
}
