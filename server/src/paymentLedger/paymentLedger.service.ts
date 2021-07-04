import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { PaymentLedgerServiceBase } from "./base/paymentLedger.service.base";

@Injectable()
export class PaymentLedgerService extends PaymentLedgerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
