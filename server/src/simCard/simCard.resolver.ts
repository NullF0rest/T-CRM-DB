import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { SimCardResolverBase } from "./base/simCard.resolver.base";
import { SimCard } from "./base/SimCard";
import { SimCardService } from "./simCard.service";

@graphql.Resolver(() => SimCard)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SimCardResolver extends SimCardResolverBase {
  constructor(
    protected readonly service: SimCardService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
