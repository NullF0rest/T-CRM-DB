import { PrismaService } from "nestjs-prisma";

import {
  Prisma,
  PaymentLedger,
  Invoice,
  PaymentOption,
  Subscription,
  Transaction,
  BalanceAccount,
  Customer,
} from "@prisma/client";

export class PaymentLedgerServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.PaymentLedgerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentLedgerFindManyArgs>
  ): Promise<number> {
    return this.prisma.paymentLedger.count(args);
  }

  async findMany<T extends Prisma.PaymentLedgerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentLedgerFindManyArgs>
  ): Promise<PaymentLedger[]> {
    return this.prisma.paymentLedger.findMany(args);
  }
  async findOne<T extends Prisma.PaymentLedgerFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentLedgerFindUniqueArgs>
  ): Promise<PaymentLedger | null> {
    return this.prisma.paymentLedger.findUnique(args);
  }
  async create<T extends Prisma.PaymentLedgerCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentLedgerCreateArgs>
  ): Promise<PaymentLedger> {
    return this.prisma.paymentLedger.create<T>(args);
  }
  async update<T extends Prisma.PaymentLedgerUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentLedgerUpdateArgs>
  ): Promise<PaymentLedger> {
    return this.prisma.paymentLedger.update<T>(args);
  }
  async delete<T extends Prisma.PaymentLedgerDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentLedgerDeleteArgs>
  ): Promise<PaymentLedger> {
    return this.prisma.paymentLedger.delete(args);
  }

  async findInvoices(
    parentId: string,
    args: Prisma.InvoiceFindManyArgs
  ): Promise<Invoice[]> {
    return this.prisma.paymentLedger
      .findUnique({
        where: { id: parentId },
      })
      .invoices(args);
  }

  async findPaymentOptions(
    parentId: string,
    args: Prisma.PaymentOptionFindManyArgs
  ): Promise<PaymentOption[]> {
    return this.prisma.paymentLedger
      .findUnique({
        where: { id: parentId },
      })
      .paymentOptions(args);
  }

  async findSubscriptions(
    parentId: string,
    args: Prisma.SubscriptionFindManyArgs
  ): Promise<Subscription[]> {
    return this.prisma.paymentLedger
      .findUnique({
        where: { id: parentId },
      })
      .subscriptions(args);
  }

  async findTransactions(
    parentId: string,
    args: Prisma.TransactionFindManyArgs
  ): Promise<Transaction[]> {
    return this.prisma.paymentLedger
      .findUnique({
        where: { id: parentId },
      })
      .transactions(args);
  }

  async getBalanceAccounts(parentId: string): Promise<BalanceAccount | null> {
    return this.prisma.paymentLedger
      .findUnique({
        where: { id: parentId },
      })
      .balanceAccounts();
  }

  async getCustomer(parentId: string): Promise<Customer | null> {
    return this.prisma.paymentLedger
      .findUnique({
        where: { id: parentId },
      })
      .customer();
  }
}
