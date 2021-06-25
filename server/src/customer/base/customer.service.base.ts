import { PrismaService } from "nestjs-prisma";

import {
  Prisma,
  Customer,
  SimCard,
  CustomerSnapshot,
  Address,
  BalanceAccount,
  Subscription,
} from "@prisma/client";

export class CustomerServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.CustomerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CustomerFindManyArgs>
  ): Promise<number> {
    return this.prisma.customer.count(args);
  }

  async findMany<T extends Prisma.CustomerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CustomerFindManyArgs>
  ): Promise<Customer[]> {
    return this.prisma.customer.findMany(args);
  }
  async findOne<T extends Prisma.CustomerFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CustomerFindUniqueArgs>
  ): Promise<Customer | null> {
    return this.prisma.customer.findUnique(args);
  }
  async create<T extends Prisma.CustomerCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CustomerCreateArgs>
  ): Promise<Customer> {
    return this.prisma.customer.create<T>(args);
  }
  async update<T extends Prisma.CustomerUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CustomerUpdateArgs>
  ): Promise<Customer> {
    return this.prisma.customer.update<T>(args);
  }
  async delete<T extends Prisma.CustomerDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CustomerDeleteArgs>
  ): Promise<Customer> {
    return this.prisma.customer.delete(args);
  }

  async findSimCards(
    parentId: string,
    args: Prisma.SimCardFindManyArgs
  ): Promise<SimCard[]> {
    return this.prisma.customer
      .findUnique({
        where: { id: parentId },
      })
      .simCards(args);
  }

  async findSnapshots(
    parentId: string,
    args: Prisma.CustomerSnapshotFindManyArgs
  ): Promise<CustomerSnapshot[]> {
    return this.prisma.customer
      .findUnique({
        where: { id: parentId },
      })
      .snapshots(args);
  }

  async getAddress(parentId: string): Promise<Address | null> {
    return this.prisma.customer
      .findUnique({
        where: { id: parentId },
      })
      .address();
  }

  async getBalanceAccount(parentId: string): Promise<BalanceAccount | null> {
    return this.prisma.customer
      .findUnique({
        where: { id: parentId },
      })
      .balanceAccount();
  }

  async getSubscriptions(parentId: string): Promise<Subscription | null> {
    return this.prisma.customer
      .findUnique({
        where: { id: parentId },
      })
      .subscriptions();
  }
}