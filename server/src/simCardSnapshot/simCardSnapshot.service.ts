import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { SimCardSnapshotServiceBase } from "./base/simCardSnapshot.service.base";

@Injectable()
export class SimCardSnapshotService extends SimCardSnapshotServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
