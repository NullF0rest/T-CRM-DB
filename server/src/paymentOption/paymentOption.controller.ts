import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PaymentOptionService } from "./paymentOption.service";
import { PaymentOptionControllerBase } from "./base/paymentOption.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("payment-options")
@common.Controller("payment-options")
export class PaymentOptionController extends PaymentOptionControllerBase {
  constructor(
    protected readonly service: PaymentOptionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
