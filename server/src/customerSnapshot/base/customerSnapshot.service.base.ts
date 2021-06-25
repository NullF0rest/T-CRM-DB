import { PrismaService } from "nestjs-prisma";
import { Prisma, CustomerSnapshot, Customer } from "@prisma/client";

export class CustomerSnapshotServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.CustomerSnapshotFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CustomerSnapshotFindManyArgs>
  ): Promise<number> {
    return this.prisma.customerSnapshot.count(args);
  }

  async findMany<T extends Prisma.CustomerSnapshotFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CustomerSnapshotFindManyArgs>
  ): Promise<CustomerSnapshot[]> {
    return this.prisma.customerSnapshot.findMany(args);
  }
  async findOne<T extends Prisma.CustomerSnapshotFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CustomerSnapshotFindUniqueArgs>
  ): Promise<CustomerSnapshot | null> {
    return this.prisma.customerSnapshot.findUnique(args);
  }
  async create<T extends Prisma.CustomerSnapshotCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CustomerSnapshotCreateArgs>
  ): Promise<CustomerSnapshot> {
    return this.prisma.customerSnapshot.create<T>(args);
  }
  async update<T extends Prisma.CustomerSnapshotUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CustomerSnapshotUpdateArgs>
  ): Promise<CustomerSnapshot> {
    return this.prisma.customerSnapshot.update<T>(args);
  }
  async delete<T extends Prisma.CustomerSnapshotDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CustomerSnapshotDeleteArgs>
  ): Promise<CustomerSnapshot> {
    return this.prisma.customerSnapshot.delete(args);
  }

  async getCustomerId(parentId: string): Promise<Customer | null> {
    return this.prisma.customerSnapshot
      .findUnique({
        where: { id: parentId },
      })
      .customerId();
  }
}
