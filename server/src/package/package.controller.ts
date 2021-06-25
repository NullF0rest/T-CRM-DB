import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PackageService } from "./package.service";
import { PackageControllerBase } from "./base/package.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("packages")
@common.Controller("packages")
export class PackageController extends PackageControllerBase {
  constructor(
    protected readonly service: PackageService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
