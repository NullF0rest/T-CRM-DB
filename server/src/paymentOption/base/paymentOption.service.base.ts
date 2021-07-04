import { PrismaService } from "nestjs-prisma";
import { Prisma, PaymentOption, PaymentLedger, Invoice } from "@prisma/client";

export class PaymentOptionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.PaymentOptionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentOptionFindManyArgs>
  ): Promise<number> {
    return this.prisma.paymentOption.count(args);
  }

  async findMany<T extends Prisma.PaymentOptionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentOptionFindManyArgs>
  ): Promise<PaymentOption[]> {
    return this.prisma.paymentOption.findMany(args);
  }
  async findOne<T extends Prisma.PaymentOptionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentOptionFindUniqueArgs>
  ): Promise<PaymentOption | null> {
    return this.prisma.paymentOption.findUnique(args);
  }
  async create<T extends Prisma.PaymentOptionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentOptionCreateArgs>
  ): Promise<PaymentOption> {
    return this.prisma.paymentOption.create<T>(args);
  }
  async update<T extends Prisma.PaymentOptionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentOptionUpdateArgs>
  ): Promise<PaymentOption> {
    return this.prisma.paymentOption.update<T>(args);
  }
  async delete<T extends Prisma.PaymentOptionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentOptionDeleteArgs>
  ): Promise<PaymentOption> {
    return this.prisma.paymentOption.delete(args);
  }

  async findPaymentLedger(
    parentId: string,
    args: Prisma.PaymentLedgerFindManyArgs
  ): Promise<PaymentLedger[]> {
    return this.prisma.paymentOption
      .findUnique({
        where: { id: parentId },
      })
      .paymentLedger(args);
  }

  async getInvoice(parentId: string): Promise<Invoice | null> {
    return this.prisma.paymentOption
      .findUnique({
        where: { id: parentId },
      })
      .invoice();
  }
}
