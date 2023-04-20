import {
  Headers,
  HttpException,
  Injectable,
  NestMiddleware,
  Req,
} from '@nestjs/common';
import { log } from 'console';
import { Request, Response, NextFunction } from 'express';

import { PrismaService } from 'src/database/prisma.service';

interface CustomRequest extends Request {
  tenant_id: string;
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: Function) {
    //  const headers = req.headers;
    const tenant_id = req.headers['x-tenant-id'];
    // console.log(req.headers);
    // console.log(req.headers['x-tenant-id']);
    // if (tenant_id) {
    //     throw new HttpException(`Empresa codigo :${tenant_valid}`, 202);
    //   throw new HttpException(`request possui Tenant: `, 202);
    // } else {
    //   throw new HttpException(`request Não possui Tenant`, 202);
    // }

    const tenant_valid = await this.prisma.company
      .findFirstOrThrow({
        where: {
          idCompany: Number(tenant_id),
        },
      })
      .catch(() => {
        throw new HttpException('Empresa Não cadastrada:${tenant_id}', 202);
      });

    if (tenant_valid) {
      //req.tenant_id = tenant_valid.idCompany;

      req.body.tenant_id = tenant_valid.idCompany;
      req.headers.tenant_id = tenant_valid.idCompany.toString();

      //console.log(req.body);

      next();
    } else {
      throw new HttpException(`Empresa codigo :${tenant_valid}`, 202);
    }
  }
}
