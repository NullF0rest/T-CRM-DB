import { Module } from "@nestjs/common";
import { CustomerSnapshotModuleBase } from "./base/customerSnapshot.module.base";
import { CustomerSnapshotService } from "./customerSnapshot.service";
import { CustomerSnapshotController } from "./customerSnapshot.controller";
import { CustomerSnapshotResolver } from "./customerSnapshot.resolver";

@Module({
  imports: [CustomerSnapshotModuleBase],
  controllers: [CustomerSnapshotController],
  providers: [CustomerSnapshotService, CustomerSnapshotResolver],
  exports: [CustomerSnapshotService],
})
export class CustomerSnapshotModule {}
