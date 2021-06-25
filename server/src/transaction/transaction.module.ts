import { Module } from "@nestjs/common";
import { TransactionModuleBase } from "./base/transaction.module.base";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { TransactionResolver } from "./transaction.resolver";

@Module({
  imports: [TransactionModuleBase],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionResolver],
  exports: [TransactionService],
})
export class TransactionModule {}
