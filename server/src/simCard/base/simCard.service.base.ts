import { PrismaService } from "nestjs-prisma";
import {
  Prisma,
  SimCard,
  AddonPackage,
  SimCardSnapshot,
  Company,
  Customer,
  Package,
} from "@prisma/client";

export class SimCardServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.SimCardFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SimCardFindManyArgs>
  ): Promise<number> {
    return this.prisma.simCard.count(args);
  }

  async findMany<T extends Prisma.SimCardFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SimCardFindManyArgs>
  ): Promise<SimCard[]> {
    return this.prisma.simCard.findMany(args);
  }
  async findOne<T extends Prisma.SimCardFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SimCardFindUniqueArgs>
  ): Promise<SimCard | null> {
    return this.prisma.simCard.findUnique(args);
  }
  async create<T extends Prisma.SimCardCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SimCardCreateArgs>
  ): Promise<SimCard> {
    return this.prisma.simCard.create<T>(args);
  }
  async update<T extends Prisma.SimCardUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SimCardUpdateArgs>
  ): Promise<SimCard> {
    return this.prisma.simCard.update<T>(args);
  }
  async delete<T extends Prisma.SimCardDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SimCardDeleteArgs>
  ): Promise<SimCard> {
    return this.prisma.simCard.delete(args);
  }

  async findAddonPackages(
    parentId: string,
    args: Prisma.AddonPackageFindManyArgs
  ): Promise<AddonPackage[]> {
    return this.prisma.simCard
      .findUnique({
        where: { id: parentId },
      })
      .addonPackages(args);
  }

  async findSnapshot(
    parentId: string,
    args: Prisma.SimCardSnapshotFindManyArgs
  ): Promise<SimCardSnapshot[]> {
    return this.prisma.simCard
      .findUnique({
        where: { id: parentId },
      })
      .snapshot(args);
  }

  async getCompany(parentId: string): Promise<Company | null> {
    return this.prisma.simCard
      .findUnique({
        where: { id: parentId },
      })
      .company();
  }

  async getCustomer(parentId: string): Promise<Customer | null> {
    return this.prisma.simCard
      .findUnique({
        where: { id: parentId },
      })
      .customer();
  }

  async getPackage(parentId: string): Promise<Package | null> {
    return this.prisma.simCard
      .findUnique({
        where: { id: parentId },
      })
      .package();
  }
}
