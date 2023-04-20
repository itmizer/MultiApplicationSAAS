import { Company } from './entities/company.entity';
import { PrismaService } from './../../database/prisma.service';
import { HttpException, Injectable } from '@nestjs/common';
import { CompanyDto } from './dto/Company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}
  async create(companyDTO: CompanyDto) {
    const CompanyExists = await this.prisma.company.findFirst({
      where: {
        cnpj: companyDTO.cnpj,
      },
    });

    if (CompanyExists) {
      throw new HttpException('Empresa Já Possui Cadastro', 202);
    } else {
      const tpPayment = [
        {
          name: 'DINHEIRO',
        },
        {
          name: 'PIX',
        },
        {
          name: 'CARTÃO DE CRÉDITO',
        },
        {
          name: 'CARTÃO DE DÉBITO',
        },
      ];
      console.log(tpPayment);

      return this.prisma.company.create({
        data: {
          logomarca: companyDTO.logomarca,
          NomeEmpresa: companyDTO.NomeEmpresa,
          cnpj: companyDTO.cnpj,
          razaosocial: companyDTO.razaosocial,
          logradouro: companyDTO.logradouro,
          logradouroComplemento: companyDTO.logradouroComplemento,
          bairro: companyDTO.bairro,
          cep: companyDTO.cep,
          cidade: companyDTO.cidade,
          estado: companyDTO.estado,
          email: companyDTO.email,
          typePayment: {
            create: companyDTO.typePayment.map((type) => ({
              name: type.name,
              type: type.type,
            })),
          },
        },
      });
    }
  }

  findAll() {
    return this.prisma.company.findMany({});
  }

  findOne(code: number) {
    return this.prisma.company.findUnique({
      where: {
        idCompany: code,
      },
    });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const udpate = await this.prisma.company.update({
      where: {
        idCompany: id,
      },
      data: updateCompanyDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
