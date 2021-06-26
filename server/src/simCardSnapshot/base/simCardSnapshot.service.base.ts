import { PrismaService } from "nestjs-prisma";
import { Prisma, SimCardSnapshot, SimCard } from "@prisma/client";

export class SimCardSnapshotServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.SimCardSnapshotFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SimCardSnapshotFindManyArgs>
  ): Promise<number> {
    return this.prisma.simCardSnapshot.count(args);
  }

  async findMany<T extends Prisma.SimCardSnapshotFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SimCardSnapshotFindManyArgs>
  ): Promise<SimCardSnapshot[]> {
    return this.prisma.simCardSnapshot.findMany(args);
  }
  async findOne<T extends Prisma.SimCardSnapshotFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SimCardSnapshotFindUniqueArgs>
  ): Promise<SimCardSnapshot | null> {
    return this.prisma.simCardSnapshot.findUnique(args);
  }
  async create<T extends Prisma.SimCardSnapshotCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SimCardSnapshotCreateArgs>
  ): Promise<SimCardSnapshot> {
    return this.prisma.simCardSnapshot.create<T>(args);
  }
  async update<T extends Prisma.SimCardSnapshotUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SimCardSnapshotUpdateArgs>
  ): Promise<SimCardSnapshot> {
    return this.prisma.simCardSnapshot.update<T>(args);
  }
  async delete<T extends Prisma.SimCardSnapshotDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SimCardSnapshotDeleteArgs>
  ): Promise<SimCardSnapshot> {
    return this.prisma.simCardSnapshot.delete(args);
  }

  async getSimCard(parentId: string): Promise<SimCard | null> {
    return this.prisma.simCardSnapshot
      .findUnique({
        where: { id: parentId },
      })
      .simCard();
  }
}
