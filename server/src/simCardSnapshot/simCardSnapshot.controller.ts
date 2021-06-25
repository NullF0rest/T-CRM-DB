import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SimCardSnapshotService } from "./simCardSnapshot.service";
import { SimCardSnapshotControllerBase } from "./base/simCardSnapshot.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("sim-card-snapshots")
@common.Controller("sim-card-snapshots")
export class SimCardSnapshotController extends SimCardSnapshotControllerBase {
  constructor(
    protected readonly service: SimCardSnapshotService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
