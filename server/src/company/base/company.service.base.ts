import { PrismaService } from "nestjs-prisma";
import { Prisma, Company, Package, SimCard } from "@prisma/client";

export class CompanyServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.CompanyFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyFindManyArgs>
  ): Promise<number> {
    return this.prisma.company.count(args);
  }

  async findMany<T extends Prisma.CompanyFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyFindManyArgs>
  ): Promise<Company[]> {
    return this.prisma.company.findMany(args);
  }
  async findOne<T extends Prisma.CompanyFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyFindUniqueArgs>
  ): Promise<Company | null> {
    return this.prisma.company.findUnique(args);
  }
  async create<T extends Prisma.CompanyCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyCreateArgs>
  ): Promise<Company> {
    return this.prisma.company.create<T>(args);
  }
  async update<T extends Prisma.CompanyUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyUpdateArgs>
  ): Promise<Company> {
    return this.prisma.company.update<T>(args);
  }
  async delete<T extends Prisma.CompanyDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyDeleteArgs>
  ): Promise<Company> {
    return this.prisma.company.delete(args);
  }

  async findPackages(
    parentId: string,
    args: Prisma.PackageFindManyArgs
  ): Promise<Package[]> {
    return this.prisma.company
      .findUnique({
        where: { id: parentId },
      })
      .packages(args);
  }

  async findSimCards(
    parentId: string,
    args: Prisma.SimCardFindManyArgs
  ): Promise<SimCard[]> {
    return this.prisma.company
      .findUnique({
        where: { id: parentId },
      })
      .simCards(args);
  }
}
