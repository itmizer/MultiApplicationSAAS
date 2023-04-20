import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { ReservationService } from 'src/app/reservation/service/reservation.service';
import { PrismaService } from 'src/database/prisma.service';
import { NotificationService } from 'src/microservice/notification.service';
//import { InvoiceContractDto } from '../invoices/dto/invoice-contract.dto';
//import { InvoicesService } from '../invoices/invoices.service';
import { ContractDto } from './dto/contract.dto';

@Injectable()
export class ContractService {
  constructor(
    private prisma: PrismaService, //private invoicesService: InvoicesService,
    private readonly reservation: ReservationService,
    private notification: NotificationService,
  ) {}
  async create(createContractDto: ContractDto) {
    const numPayments = await this.calculateNumPayments(
      createContractDto.period,
    );

    //return numPayments;

    const newContract = await this.prisma.contract.create({
      data: {
        tenant_id: createContractDto.tenant_id,
        idPerson: createContractDto.idPerson,
        period: createContractDto.period,
        plan: createContractDto.plan,
        dateStart: createContractDto.dateStart,
        taxRegistration: createContractDto.taxRegistration,
        amount: createContractDto.amount * createContractDto.period,
        typePayment: createContractDto.typePayment,
        Invoice: {
          create: Array(Math.ceil(createContractDto.period))
            .fill(null)
            .map((_, i) => ({
              amount: createContractDto.amount,
              amountInvoice: createContractDto.amount,
              status: 'Gerada',
              plan: createContractDto.plan,

              dateStart: new Date(
                createContractDto.dateStart.getFullYear(),
                createContractDto.dateStart.getMonth() + i,
                createContractDto.dateStart.getDate(),
              ),
              dtDue: new Date(
                createContractDto.dateStart.getFullYear(),
                createContractDto.dateStart.getMonth() + i,
                createContractDto.dateStart.getDate(),
              ),
              dtEnd: new Date(
                createContractDto.dateStart.getFullYear(),
                createContractDto.dateStart.getMonth() + (i + 1),
                createContractDto.dateStart.getDate(),
              ),
              idPerson: createContractDto.idPerson,
              typePayment: createContractDto.typePayment,
              installments: i + 1,
            })),
        },
      },
    });

    if (newContract) {
      const person = await this.prisma.person.update({
        where: {
          idPerson_tenant_id: {
            idPerson: createContractDto.idPerson,
            tenant_id: createContractDto.tenant_id,
          },
        },
        data: {
          status: 'Ativo',
        },
      });

      const company = await this.prisma.company.findFirst({
        where: { idCompany: createContractDto.tenant_id },
      });

      if (company.segment == 'studio') {
        const reservation = await this.reservation.sendReservationContract(
          newContract,
        );
        if (reservation) {
        }
        throw new HttpException(
          'Contrato e Agenda Gerados com Sucesso',
          HttpStatus.CREATED,
        );
      }

      throw new HttpException(
        'Contrato Gerado com Sucesso',
        HttpStatus.CREATED,
      );
    }
    throw new NotFoundException(`Contrato Não Gerado`);
  }

  async calculateNumPayments(period: number) {
    return Math.ceil(period);
  }

  findAll() {
    return `This action returns all contract`;
  }

  findOne(id: number, tenant_id: number) {
    return this.prisma.contract.aggregate({
      where: {
        idPerson: id,
      },
      _count: true,
    });
  }

  update(id: number, updateContractDto: ContractDto) {
    return this.prisma.contract.update({
      where: {
        id_tenant_id: {
          tenant_id: updateContractDto.tenant_id,
          id: id,
        },
      },
      data: {
        tenant_id: updateContractDto.tenant_id,
        idPerson: updateContractDto.idPerson,
        period: updateContractDto.period,
        plan: updateContractDto.plan,
        dateStart: updateContractDto.dateStart,
        taxRegistration: updateContractDto.taxRegistration,
        amount: updateContractDto.amount * updateContractDto.period,
        typePayment: updateContractDto.typePayment,
        Invoice: {
          updateMany: {
            where: {
              nContract: id,
            },
            data: Array(Math.ceil(updateContractDto.period))
              .fill(null)
              .map((_, i) => ({
                amount: updateContractDto.amount,
                amountInvoice: updateContractDto.amount,
                plan: updateContractDto.plan,
                tenant_id: updateContractDto.tenant_id,
                dateStart: new Date(
                  updateContractDto.dateStart.getFullYear(),
                  updateContractDto.dateStart.getMonth() + i,
                  updateContractDto.dateStart.getDate(),
                ),
                dtDue: new Date(
                  updateContractDto.dateStart.getFullYear(),
                  updateContractDto.dateStart.getMonth() + i,
                  updateContractDto.dateStart.getDate(),
                ),
                dtEnd: new Date(
                  updateContractDto.dateStart.getFullYear(),
                  updateContractDto.dateStart.getMonth() + (i + 1),
                  updateContractDto.dateStart.getDate(),
                ),
                idPerson: updateContractDto.idPerson,
                typePayment: updateContractDto.typePayment,
                installments: i + 1,
              })),
          },

          //connect:  ,
        },
      },
    });
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
