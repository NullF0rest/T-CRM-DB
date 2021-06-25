import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SubscriptionService } from "./subscription.service";
import { SubscriptionControllerBase } from "./base/subscription.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("subscriptions")
@common.Controller("subscriptions")
export class SubscriptionController extends SubscriptionControllerBase {
  constructor(
    protected readonly service: SubscriptionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
