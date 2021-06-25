import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { CustomerSnapshotResolverBase } from "./base/customerSnapshot.resolver.base";
import { CustomerSnapshot } from "./base/CustomerSnapshot";
import { CustomerSnapshotService } from "./customerSnapshot.service";

@graphql.Resolver(() => CustomerSnapshot)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class CustomerSnapshotResolver extends CustomerSnapshotResolverBase {
  constructor(
    protected readonly service: CustomerSnapshotService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
