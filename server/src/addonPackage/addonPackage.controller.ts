import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AddonPackageService } from "./addonPackage.service";
import { AddonPackageControllerBase } from "./base/addonPackage.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("addon-packages")
@common.Controller("addon-packages")
export class AddonPackageController extends AddonPackageControllerBase {
  constructor(
    protected readonly service: AddonPackageService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
