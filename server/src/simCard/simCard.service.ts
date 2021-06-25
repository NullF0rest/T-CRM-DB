import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { SimCardServiceBase } from "./base/simCard.service.base";

@Injectable()
export class SimCardService extends SimCardServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
