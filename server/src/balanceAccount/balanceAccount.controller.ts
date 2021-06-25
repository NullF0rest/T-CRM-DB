import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BalanceAccountService } from "./balanceAccount.service";
import { BalanceAccountControllerBase } from "./base/balanceAccount.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("balance-accounts")
@common.Controller("balance-accounts")
export class BalanceAccountController extends BalanceAccountControllerBase {
  constructor(
    protected readonly service: BalanceAccountService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
