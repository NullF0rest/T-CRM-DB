import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { PaymentOptionResolverBase } from "./base/paymentOption.resolver.base";
import { PaymentOption } from "./base/PaymentOption";
import { PaymentOptionService } from "./paymentOption.service";

@graphql.Resolver(() => PaymentOption)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PaymentOptionResolver extends PaymentOptionResolverBase {
  constructor(
    protected readonly service: PaymentOptionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
