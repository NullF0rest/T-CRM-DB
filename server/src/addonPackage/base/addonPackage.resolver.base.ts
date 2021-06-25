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
import { CreateAddonPackageArgs } from "./CreateAddonPackageArgs";
import { UpdateAddonPackageArgs } from "./UpdateAddonPackageArgs";
import { DeleteAddonPackageArgs } from "./DeleteAddonPackageArgs";
import { AddonPackageFindManyArgs } from "./AddonPackageFindManyArgs";
import { AddonPackageFindUniqueArgs } from "./AddonPackageFindUniqueArgs";
import { AddonPackage } from "./AddonPackage";
import { SimCardFindManyArgs } from "../../simCard/base/SimCardFindManyArgs";
import { SimCard } from "../../simCard/base/SimCard";
import { AddonPackageService } from "../addonPackage.service";

@graphql.Resolver(() => AddonPackage)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class AddonPackageResolverBase {
  constructor(
    protected readonly service: AddonPackageService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "AddonPackage",
    action: "read",
    possession: "any",
  })
  async _addonPackagesMeta(
    @graphql.Args() args: AddonPackageFindManyArgs
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

  @graphql.Query(() => [AddonPackage])
  @nestAccessControl.UseRoles({
    resource: "AddonPackage",
    action: "read",
    possession: "any",
  })
  async addonPackages(
    @graphql.Args() args: AddonPackageFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<AddonPackage[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "AddonPackage",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => AddonPackage, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "AddonPackage",
    action: "read",
    possession: "own",
  })
  async addonPackage(
    @graphql.Args() args: AddonPackageFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<AddonPackage | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "AddonPackage",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => AddonPackage)
  @nestAccessControl.UseRoles({
    resource: "AddonPackage",
    action: "create",
    possession: "any",
  })
  async createAddonPackage(
    @graphql.Args() args: CreateAddonPackageArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<AddonPackage> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "AddonPackage",
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
        `providing the properties: ${properties} on ${"AddonPackage"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => AddonPackage)
  @nestAccessControl.UseRoles({
    resource: "AddonPackage",
    action: "update",
    possession: "any",
  })
  async updateAddonPackage(
    @graphql.Args() args: UpdateAddonPackageArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<AddonPackage | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "AddonPackage",
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
        `providing the properties: ${properties} on ${"AddonPackage"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
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

  @graphql.Mutation(() => AddonPackage)
  @nestAccessControl.UseRoles({
    resource: "AddonPackage",
    action: "delete",
    possession: "any",
  })
  async deleteAddonPackage(
    @graphql.Args() args: DeleteAddonPackageArgs
  ): Promise<AddonPackage | null> {
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

  @graphql.ResolveField(() => [SimCard])
  @nestAccessControl.UseRoles({
    resource: "AddonPackage",
    action: "read",
    possession: "any",
  })
  async simCard(
    @graphql.Parent() parent: AddonPackage,
    @graphql.Args() args: SimCardFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SimCard[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SimCard",
    });
    const results = await this.service.findSimCard(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
