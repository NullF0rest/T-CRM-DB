import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { AddonPackageResolverBase } from "./base/addonPackage.resolver.base";
import { AddonPackage } from "./base/AddonPackage";
import { AddonPackageService } from "./addonPackage.service";

@graphql.Resolver(() => AddonPackage)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class AddonPackageResolver extends AddonPackageResolverBase {
  constructor(
    protected readonly service: AddonPackageService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
