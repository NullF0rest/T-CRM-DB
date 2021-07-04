import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { PaymentLedgerResolverBase } from "./base/paymentLedger.resolver.base";
import { PaymentLedger } from "./base/PaymentLedger";
import { PaymentLedgerService } from "./paymentLedger.service";

@graphql.Resolver(() => PaymentLedger)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PaymentLedgerResolver extends PaymentLedgerResolverBase {
  constructor(
    protected readonly service: PaymentLedgerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
