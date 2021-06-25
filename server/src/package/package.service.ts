import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { PackageServiceBase } from "./base/package.service.base";

@Injectable()
export class PackageService extends PackageServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
