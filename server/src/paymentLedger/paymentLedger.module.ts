import { Module } from "@nestjs/common";
import { PaymentLedgerModuleBase } from "./base/paymentLedger.module.base";
import { PaymentLedgerService } from "./paymentLedger.service";
import { PaymentLedgerController } from "./paymentLedger.controller";
import { PaymentLedgerResolver } from "./paymentLedger.resolver";

@Module({
  imports: [PaymentLedgerModuleBase],
  controllers: [PaymentLedgerController],
  providers: [PaymentLedgerService, PaymentLedgerResolver],
  exports: [PaymentLedgerService],
})
export class PaymentLedgerModule {}
