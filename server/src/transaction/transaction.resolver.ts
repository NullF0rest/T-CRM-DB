import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { TransactionResolverBase } from "./base/transaction.resolver.base";
import { Transaction } from "./base/Transaction";
import { TransactionService } from "./transaction.service";

@graphql.Resolver(() => Transaction)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TransactionResolver extends TransactionResolverBase {
  constructor(
    protected readonly service: TransactionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
