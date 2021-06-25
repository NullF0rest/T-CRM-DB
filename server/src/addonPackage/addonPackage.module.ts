import { Module } from "@nestjs/common";
import { AddonPackageModuleBase } from "./base/addonPackage.module.base";
import { AddonPackageService } from "./addonPackage.service";
import { AddonPackageController } from "./addonPackage.controller";
import { AddonPackageResolver } from "./addonPackage.resolver";

@Module({
  imports: [AddonPackageModuleBase],
  controllers: [AddonPackageController],
  providers: [AddonPackageService, AddonPackageResolver],
  exports: [AddonPackageService],
})
export class AddonPackageModule {}
