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
import { CreatePackageArgs } from "./CreatePackageArgs";
import { UpdatePackageArgs } from "./UpdatePackageArgs";
import { DeletePackageArgs } from "./DeletePackageArgs";
import { PackageFindManyArgs } from "./PackageFindManyArgs";
import { PackageFindUniqueArgs } from "./PackageFindUniqueArgs";
import { Package } from "./Package";
import { SimCardFindManyArgs } from "../../simCard/base/SimCardFindManyArgs";
import { SimCard } from "../../simCard/base/SimCard";
import { Company } from "../../company/base/Company";
import { PackageService } from "../package.service";

@graphql.Resolver(() => Package)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PackageResolverBase {
  constructor(
    protected readonly service: PackageService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Package",
    action: "read",
    possession: "any",
  })
  async _packagesMeta(
    @graphql.Args() args: PackageFindManyArgs
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

  @graphql.Query(() => [Package])
  @nestAccessControl.UseRoles({
    resource: "Package",
    action: "read",
    possession: "any",
  })
  async packages(
    @graphql.Args() args: PackageFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Package[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Package",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Package, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Package",
    action: "read",
    possession: "own",
  })
  async package(
    @graphql.Args() args: PackageFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Package | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Package",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Package)
  @nestAccessControl.UseRoles({
    resource: "Package",
    action: "create",
    possession: "any",
  })
  async createPackage(
    @graphql.Args() args: CreatePackageArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Package> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Package",
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
        `providing the properties: ${properties} on ${"Package"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        company: {
          connect: args.data.company,
        },
      },
    });
  }

  @graphql.Mutation(() => Package)
  @nestAccessControl.UseRoles({
    resource: "Package",
    action: "update",
    possession: "any",
  })
  async updatePackage(
    @graphql.Args() args: UpdatePackageArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Package | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Package",
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
        `providing the properties: ${properties} on ${"Package"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          company: {
            connect: args.data.company,
          },
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

  @graphql.Mutation(() => Package)
  @nestAccessControl.UseRoles({
    resource: "Package",
    action: "delete",
    possession: "any",
  })
  async deletePackage(
    @graphql.Args() args: DeletePackageArgs
  ): Promise<Package | null> {
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
    resource: "Package",
    action: "read",
    possession: "any",
  })
  async simCards(
    @graphql.Parent() parent: Package,
    @graphql.Args() args: SimCardFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SimCard[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SimCard",
    });
    const results = await this.service.findSimCards(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Company, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Package",
    action: "read",
    possession: "any",
  })
  async company(
    @graphql.Parent() parent: Package,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Company | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Company",
    });
    const result = await this.service.getCompany(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
