import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { BalanceAccountServiceBase } from "./base/balanceAccount.service.base";

@Injectable()
export class BalanceAccountService extends BalanceAccountServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
