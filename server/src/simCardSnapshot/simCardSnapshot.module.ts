import { Module } from "@nestjs/common";
import { SimCardSnapshotModuleBase } from "./base/simCardSnapshot.module.base";
import { SimCardSnapshotService } from "./simCardSnapshot.service";
import { SimCardSnapshotController } from "./simCardSnapshot.controller";
import { SimCardSnapshotResolver } from "./simCardSnapshot.resolver";

@Module({
  imports: [SimCardSnapshotModuleBase],
  controllers: [SimCardSnapshotController],
  providers: [SimCardSnapshotService, SimCardSnapshotResolver],
  exports: [SimCardSnapshotService],
})
export class SimCardSnapshotModule {}
