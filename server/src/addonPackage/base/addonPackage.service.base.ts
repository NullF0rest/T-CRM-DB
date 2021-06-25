import { PrismaService } from "nestjs-prisma";
import { Prisma, AddonPackage, SimCard } from "@prisma/client";

export class AddonPackageServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.AddonPackageFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AddonPackageFindManyArgs>
  ): Promise<number> {
    return this.prisma.addonPackage.count(args);
  }

  async findMany<T extends Prisma.AddonPackageFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AddonPackageFindManyArgs>
  ): Promise<AddonPackage[]> {
    return this.prisma.addonPackage.findMany(args);
  }
  async findOne<T extends Prisma.AddonPackageFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.AddonPackageFindUniqueArgs>
  ): Promise<AddonPackage | null> {
    return this.prisma.addonPackage.findUnique(args);
  }
  async create<T extends Prisma.AddonPackageCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AddonPackageCreateArgs>
  ): Promise<AddonPackage> {
    return this.prisma.addonPackage.create<T>(args);
  }
  async update<T extends Prisma.AddonPackageUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AddonPackageUpdateArgs>
  ): Promise<AddonPackage> {
    return this.prisma.addonPackage.update<T>(args);
  }
  async delete<T extends Prisma.AddonPackageDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.AddonPackageDeleteArgs>
  ): Promise<AddonPackage> {
    return this.prisma.addonPackage.delete(args);
  }

  async findSimCard(
    parentId: string,
    args: Prisma.SimCardFindManyArgs
  ): Promise<SimCard[]> {
    return this.prisma.addonPackage
      .findUnique({
        where: { id: parentId },
      })
      .simCard(args);
  }
}
