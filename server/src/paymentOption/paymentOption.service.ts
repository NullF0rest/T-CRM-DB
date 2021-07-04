import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { PaymentOptionServiceBase } from "./base/paymentOption.service.base";

@Injectable()
export class PaymentOptionService extends PaymentOptionServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
