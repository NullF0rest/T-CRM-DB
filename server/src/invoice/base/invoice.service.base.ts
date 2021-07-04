import { PrismaService } from "nestjs-prisma";

import {
  Prisma,
  Invoice,
  PaymentOption,
  BalanceAccount,
  PaymentLedger,
  Subscription,
  Transaction,
} from "@prisma/client";

export class InvoiceServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.InvoiceFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.InvoiceFindManyArgs>
  ): Promise<number> {
    return this.prisma.invoice.count(args);
  }

  async findMany<T extends Prisma.InvoiceFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.InvoiceFindManyArgs>
  ): Promise<Invoice[]> {
    return this.prisma.invoice.findMany(args);
  }
  async findOne<T extends Prisma.InvoiceFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.InvoiceFindUniqueArgs>
  ): Promise<Invoice | null> {
    return this.prisma.invoice.findUnique(args);
  }
  async create<T extends Prisma.InvoiceCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.InvoiceCreateArgs>
  ): Promise<Invoice> {
    return this.prisma.invoice.create<T>(args);
  }
  async update<T extends Prisma.InvoiceUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.InvoiceUpdateArgs>
  ): Promise<Invoice> {
    return this.prisma.invoice.update<T>(args);
  }
  async delete<T extends Prisma.InvoiceDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.InvoiceDeleteArgs>
  ): Promise<Invoice> {
    return this.prisma.invoice.delete(args);
  }

  async findPaymentOptions(
    parentId: string,
    args: Prisma.PaymentOptionFindManyArgs
  ): Promise<PaymentOption[]> {
    return this.prisma.invoice
      .findUnique({
        where: { id: parentId },
      })
      .paymentOptions(args);
  }

  async getBalanceAccount(parentId: string): Promise<BalanceAccount | null> {
    return this.prisma.invoice
      .findUnique({
        where: { id: parentId },
      })
      .balanceAccount();
  }

  async getPaymentLedger(parentId: string): Promise<PaymentLedger | null> {
    return this.prisma.invoice
      .findUnique({
        where: { id: parentId },
      })
      .paymentLedger();
  }

  async getSubscriptions(parentId: string): Promise<Subscription | null> {
    return this.prisma.invoice
      .findUnique({
        where: { id: parentId },
      })
      .subscriptions();
  }

  async getTransaction(parentId: string): Promise<Transaction | null> {
    return this.prisma.invoice
      .findUnique({
        where: { id: parentId },
      })
      .transaction();
  }
}
