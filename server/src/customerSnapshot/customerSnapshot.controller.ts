import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CustomerSnapshotService } from "./customerSnapshot.service";
import { CustomerSnapshotControllerBase } from "./base/customerSnapshot.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("customer-snapshots")
@common.Controller("customer-snapshots")
export class CustomerSnapshotController extends CustomerSnapshotControllerBase {
  constructor(
    protected readonly service: CustomerSnapshotService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
