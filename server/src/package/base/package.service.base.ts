import { PrismaService } from "nestjs-prisma";
import { Prisma, Package, SimCard, Company } from "@prisma/client";

export class PackageServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.PackageFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PackageFindManyArgs>
  ): Promise<number> {
    return this.prisma.package.count(args);
  }

  async findMany<T extends Prisma.PackageFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PackageFindManyArgs>
  ): Promise<Package[]> {
    return this.prisma.package.findMany(args);
  }
  async findOne<T extends Prisma.PackageFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PackageFindUniqueArgs>
  ): Promise<Package | null> {
    return this.prisma.package.findUnique(args);
  }
  async create<T extends Prisma.PackageCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PackageCreateArgs>
  ): Promise<Package> {
    return this.prisma.package.create<T>(args);
  }
  async update<T extends Prisma.PackageUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PackageUpdateArgs>
  ): Promise<Package> {
    return this.prisma.package.update<T>(args);
  }
  async delete<T extends Prisma.PackageDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PackageDeleteArgs>
  ): Promise<Package> {
    return this.prisma.package.delete(args);
  }

  async findSimCards(
    parentId: string,
    args: Prisma.SimCardFindManyArgs
  ): Promise<SimCard[]> {
    return this.prisma.package
      .findUnique({
        where: { id: parentId },
      })
      .simCards(args);
  }

  async getCompany(parentId: string): Promise<Company | null> {
    return this.prisma.package
      .findUnique({
        where: { id: parentId },
      })
      .company();
  }
}
