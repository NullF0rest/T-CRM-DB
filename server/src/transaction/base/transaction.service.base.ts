import { PrismaService } from "nestjs-prisma";
import { Prisma, Transaction, BalanceAccount } from "@prisma/client";

export class TransactionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.TransactionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TransactionFindManyArgs>
  ): Promise<number> {
    return this.prisma.transaction.count(args);
  }

  async findMany<T extends Prisma.TransactionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TransactionFindManyArgs>
  ): Promise<Transaction[]> {
    return this.prisma.transaction.findMany(args);
  }
  async findOne<T extends Prisma.TransactionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TransactionFindUniqueArgs>
  ): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique(args);
  }
  async create<T extends Prisma.TransactionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TransactionCreateArgs>
  ): Promise<Transaction> {
    return this.prisma.transaction.create<T>(args);
  }
  async update<T extends Prisma.TransactionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TransactionUpdateArgs>
  ): Promise<Transaction> {
    return this.prisma.transaction.update<T>(args);
  }
  async delete<T extends Prisma.TransactionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TransactionDeleteArgs>
  ): Promise<Transaction> {
    return this.prisma.transaction.delete(args);
  }

  async getBalanceAccount(parentId: string): Promise<BalanceAccount | null> {
    return this.prisma.transaction
      .findUnique({
        where: { id: parentId },
      })
      .balanceAccount();
  }
}
