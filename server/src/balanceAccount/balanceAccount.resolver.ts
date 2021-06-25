import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { BalanceAccountResolverBase } from "./base/balanceAccount.resolver.base";
import { BalanceAccount } from "./base/BalanceAccount";
import { BalanceAccountService } from "./balanceAccount.service";

@graphql.Resolver(() => BalanceAccount)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class BalanceAccountResolver extends BalanceAccountResolverBase {
  constructor(
    protected readonly service: BalanceAccountService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
