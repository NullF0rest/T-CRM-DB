import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { AddonPackageServiceBase } from "./base/addonPackage.service.base";

@Injectable()
export class AddonPackageService extends AddonPackageServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
