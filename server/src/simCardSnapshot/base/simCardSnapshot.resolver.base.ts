import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateSimCardSnapshotArgs } from "./CreateSimCardSnapshotArgs";
import { UpdateSimCardSnapshotArgs } from "./UpdateSimCardSnapshotArgs";
import { DeleteSimCardSnapshotArgs } from "./DeleteSimCardSnapshotArgs";
import { SimCardSnapshotFindManyArgs } from "./SimCardSnapshotFindManyArgs";
import { SimCardSnapshotFindUniqueArgs } from "./SimCardSnapshotFindUniqueArgs";
import { SimCardSnapshot } from "./SimCardSnapshot";
import { SimCard } from "../../simCard/base/SimCard";
import { SimCardSnapshotService } from "../simCardSnapshot.service";

@graphql.Resolver(() => SimCardSnapshot)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SimCardSnapshotResolverBase {
  constructor(
    protected readonly service: SimCardSnapshotService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "SimCardSnapshot",
    action: "read",
    possession: "any",
  })
  async _simCardSnapshotsMeta(
    @graphql.Args() args: SimCardSnapshotFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [SimCardSnapshot])
  @nestAccessControl.UseRoles({
    resource: "SimCardSnapshot",
    action: "read",
    possession: "any",
  })
  async simCardSnapshots(
    @graphql.Args() args: SimCardSnapshotFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SimCardSnapshot[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SimCardSnapshot",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => SimCardSnapshot, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "SimCardSnapshot",
    action: "read",
    possession: "own",
  })
  async simCardSnapshot(
    @graphql.Args() args: SimCardSnapshotFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SimCardSnapshot | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "SimCardSnapshot",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => SimCardSnapshot)
  @nestAccessControl.UseRoles({
    resource: "SimCardSnapshot",
    action: "create",
    possession: "any",
  })
  async createSimCardSnapshot(
    @graphql.Args() args: CreateSimCardSnapshotArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SimCardSnapshot> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "SimCardSnapshot",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"SimCardSnapshot"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        simCardId: args.data.simCardId
          ? {
              connect: args.data.simCardId,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => SimCardSnapshot)
  @nestAccessControl.UseRoles({
    resource: "SimCardSnapshot",
    action: "update",
    possession: "any",
  })
  async updateSimCardSnapshot(
    @graphql.Args() args: UpdateSimCardSnapshotArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SimCardSnapshot | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SimCardSnapshot",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"SimCardSnapshot"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          simCardId: args.data.simCardId
            ? {
                connect: args.data.simCardId,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => SimCardSnapshot)
  @nestAccessControl.UseRoles({
    resource: "SimCardSnapshot",
    action: "delete",
    possession: "any",
  })
  async deleteSimCardSnapshot(
    @graphql.Args() args: DeleteSimCardSnapshotArgs
  ): Promise<SimCardSnapshot | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => SimCard, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "SimCardSnapshot",
    action: "read",
    possession: "any",
  })
  async simCardId(
    @graphql.Parent() parent: SimCardSnapshot,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SimCard | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SimCard",
    });
    const result = await this.service.getSimCardId(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
