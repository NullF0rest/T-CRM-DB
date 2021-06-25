import { Module } from "@nestjs/common";
import { PackageModuleBase } from "./base/package.module.base";
import { PackageService } from "./package.service";
import { PackageController } from "./package.controller";
import { PackageResolver } from "./package.resolver";

@Module({
  imports: [PackageModuleBase],
  controllers: [PackageController],
  providers: [PackageService, PackageResolver],
  exports: [PackageService],
})
export class PackageModule {}
