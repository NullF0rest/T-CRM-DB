import { Module } from "@nestjs/common";
import { BalanceAccountModuleBase } from "./base/balanceAccount.module.base";
import { BalanceAccountService } from "./balanceAccount.service";
import { BalanceAccountController } from "./balanceAccount.controller";
import { BalanceAccountResolver } from "./balanceAccount.resolver";

@Module({
  imports: [BalanceAccountModuleBase],
  controllers: [BalanceAccountController],
  providers: [BalanceAccountService, BalanceAccountResolver],
  exports: [BalanceAccountService],
})
export class BalanceAccountModule {}
