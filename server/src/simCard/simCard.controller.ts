import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SimCardService } from "./simCard.service";
import { SimCardControllerBase } from "./base/simCard.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("sim-cards")
@common.Controller("sim-cards")
export class SimCardController extends SimCardControllerBase {
  constructor(
    protected readonly service: SimCardService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
