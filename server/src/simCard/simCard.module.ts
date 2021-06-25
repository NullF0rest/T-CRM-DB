import { Module } from "@nestjs/common";
import { SimCardModuleBase } from "./base/simCard.module.base";
import { SimCardService } from "./simCard.service";
import { SimCardController } from "./simCard.controller";
import { SimCardResolver } from "./simCard.resolver";

@Module({
  imports: [SimCardModuleBase],
  controllers: [SimCardController],
  providers: [SimCardService, SimCardResolver],
  exports: [SimCardService],
})
export class SimCardModule {}
