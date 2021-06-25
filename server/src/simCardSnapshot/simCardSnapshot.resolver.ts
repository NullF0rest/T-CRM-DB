import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { SimCardSnapshotResolverBase } from "./base/simCardSnapshot.resolver.base";
import { SimCardSnapshot } from "./base/SimCardSnapshot";
import { SimCardSnapshotService } from "./simCardSnapshot.service";

@graphql.Resolver(() => SimCardSnapshot)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SimCardSnapshotResolver extends SimCardSnapshotResolverBase {
  constructor(
    protected readonly service: SimCardSnapshotService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
