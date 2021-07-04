import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PaymentLedgerService } from "./paymentLedger.service";
import { PaymentLedgerControllerBase } from "./base/paymentLedger.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("payment-ledgers")
@common.Controller("payment-ledgers")
export class PaymentLedgerController extends PaymentLedgerControllerBase {
  constructor(
    protected readonly service: PaymentLedgerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
