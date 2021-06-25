import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { SubscriptionResolverBase } from "./base/subscription.resolver.base";
import { Subscription } from "./base/Subscription";
import { SubscriptionService } from "./subscription.service";

@graphql.Resolver(() => Subscription)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SubscriptionResolver extends SubscriptionResolverBase {
  constructor(
    protected readonly service: SubscriptionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
