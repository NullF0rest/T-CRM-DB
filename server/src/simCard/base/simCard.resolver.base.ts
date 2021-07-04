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
import { CreateSimCardArgs } from "./CreateSimCardArgs";
import { UpdateSimCardArgs } from "./UpdateSimCardArgs";
import { DeleteSimCardArgs } from "./DeleteSimCardArgs";
import { SimCardFindManyArgs } from "./SimCardFindManyArgs";
import { SimCardFindUniqueArgs } from "./SimCardFindUniqueArgs";
import { SimCard } from "./SimCard";
import { AddonPackageFindManyArgs } from "../../addonPackage/base/AddonPackageFindManyArgs";
import { AddonPackage } from "../../addonPackage/base/AddonPackage";
import { SimCardSnapshotFindManyArgs } from "../../simCardSnapshot/base/SimCardSnapshotFindManyArgs";
import { SimCardSnapshot } from "../../simCardSnapshot/base/SimCardSnapshot";
import { Company } from "../../company/base/Company";
import { Customer } from "../../customer/base/Customer";
import { Package } from "../../package/base/Package";
import { SimCardService } from "../simCard.service";

@graphql.Resolver(() => SimCard)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SimCardResolverBase {
  constructor(
    protected readonly service: SimCardService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "read",
    possession: "any",
  })
  async _simCardsMeta(
    @graphql.Args() args: SimCardFindManyArgs
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

  @graphql.Query(() => [SimCard])
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "read",
    possession: "any",
  })
  async simCards(
    @graphql.Args() args: SimCardFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SimCard[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SimCard",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => SimCard, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "read",
    possession: "own",
  })
  async simCard(
    @graphql.Args() args: SimCardFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SimCard | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "SimCard",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => SimCard)
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "create",
    possession: "any",
  })
  async createSimCard(
    @graphql.Args() args: CreateSimCardArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SimCard> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "SimCard",
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
        `providing the properties: ${properties} on ${"SimCard"} creation is forbidden for roles: ${roles}`
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

        customer: args.data.customer
          ? {
              connect: args.data.customer,
            }
          : undefined,

        package: args.data.package
          ? {
              connect: args.data.package,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => SimCard)
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "update",
    possession: "any",
  })
  async updateSimCard(
    @graphql.Args() args: UpdateSimCardArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SimCard | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SimCard",
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
        `providing the properties: ${properties} on ${"SimCard"} update is forbidden for roles: ${roles}`
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

          customer: args.data.customer
            ? {
                connect: args.data.customer,
              }
            : undefined,

          package: args.data.package
            ? {
                connect: args.data.package,
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

  @graphql.Mutation(() => SimCard)
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "delete",
    possession: "any",
  })
  async deleteSimCard(
    @graphql.Args() args: DeleteSimCardArgs
  ): Promise<SimCard | null> {
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

  @graphql.ResolveField(() => [AddonPackage])
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "read",
    possession: "any",
  })
  async addonPackages(
    @graphql.Parent() parent: SimCard,
    @graphql.Args() args: AddonPackageFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<AddonPackage[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "AddonPackage",
    });
    const results = await this.service.findAddonPackages(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [SimCardSnapshot])
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "read",
    possession: "any",
  })
  async snapshot(
    @graphql.Parent() parent: SimCard,
    @graphql.Args() args: SimCardSnapshotFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SimCardSnapshot[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SimCardSnapshot",
    });
    const results = await this.service.findSnapshot(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Company, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "read",
    possession: "any",
  })
  async company(
    @graphql.Parent() parent: SimCard,
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

  @graphql.ResolveField(() => Customer, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "read",
    possession: "any",
  })
  async customer(
    @graphql.Parent() parent: SimCard,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Customer | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Customer",
    });
    const result = await this.service.getCustomer(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Package, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "read",
    possession: "any",
  })
  async package(
    @graphql.Parent() parent: SimCard,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Package | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Package",
    });
    const result = await this.service.getPackage(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
