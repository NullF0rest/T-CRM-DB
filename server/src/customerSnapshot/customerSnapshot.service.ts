import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CustomerSnapshotServiceBase } from "./base/customerSnapshot.service.base";

@Injectable()
export class CustomerSnapshotService extends CustomerSnapshotServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
