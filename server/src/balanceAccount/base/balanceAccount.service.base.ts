import { PrismaService } from "nestjs-prisma";

import {
  Prisma,
  BalanceAccount,
  Invoice,
  Transaction,
  Customer,
  PaymentLedger,
  Subscription,
} from "@prisma/client";

export class BalanceAccountServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.BalanceAccountFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BalanceAccountFindManyArgs>
  ): Promise<number> {
    return this.prisma.balanceAccount.count(args);
  }

  async findMany<T extends Prisma.BalanceAccountFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BalanceAccountFindManyArgs>
  ): Promise<BalanceAccount[]> {
    return this.prisma.balanceAccount.findMany(args);
  }
  async findOne<T extends Prisma.BalanceAccountFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.BalanceAccountFindUniqueArgs>
  ): Promise<BalanceAccount | null> {
    return this.prisma.balanceAccount.findUnique(args);
  }
  async create<T extends Prisma.BalanceAccountCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BalanceAccountCreateArgs>
  ): Promise<BalanceAccount> {
    return this.prisma.balanceAccount.create<T>(args);
  }
  async update<T extends Prisma.BalanceAccountUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BalanceAccountUpdateArgs>
  ): Promise<BalanceAccount> {
    return this.prisma.balanceAccount.update<T>(args);
  }
  async delete<T extends Prisma.BalanceAccountDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.BalanceAccountDeleteArgs>
  ): Promise<BalanceAccount> {
    return this.prisma.balanceAccount.delete(args);
  }

  async findInvoices(
    parentId: string,
    args: Prisma.InvoiceFindManyArgs
  ): Promise<Invoice[]> {
    return this.prisma.balanceAccount
      .findUnique({
        where: { id: parentId },
      })
      .invoices(args);
  }

  async findTransactions(
    parentId: string,
    args: Prisma.TransactionFindManyArgs
  ): Promise<Transaction[]> {
    return this.prisma.balanceAccount
      .findUnique({
        where: { id: parentId },
      })
      .transactions(args);
  }

  async getCustomer(parentId: string): Promise<Customer | null> {
    return this.prisma.balanceAccount
      .findUnique({
        where: { id: parentId },
      })
      .customer();
  }

  async getPaymentLedger(parentId: string): Promise<PaymentLedger | null> {
    return this.prisma.balanceAccount
      .findUnique({
        where: { id: parentId },
      })
      .paymentLedger();
  }

  async getSubscription(parentId: string): Promise<Subscription | null> {
    return this.prisma.balanceAccount
      .findUnique({
        where: { id: parentId },
      })
      .subscription();
  }
}
