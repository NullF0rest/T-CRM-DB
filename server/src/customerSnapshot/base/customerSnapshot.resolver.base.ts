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
import { CreateCustomerSnapshotArgs } from "./CreateCustomerSnapshotArgs";
import { UpdateCustomerSnapshotArgs } from "./UpdateCustomerSnapshotArgs";
import { DeleteCustomerSnapshotArgs } from "./DeleteCustomerSnapshotArgs";
import { CustomerSnapshotFindManyArgs } from "./CustomerSnapshotFindManyArgs";
import { CustomerSnapshotFindUniqueArgs } from "./CustomerSnapshotFindUniqueArgs";
import { CustomerSnapshot } from "./CustomerSnapshot";
import { Customer } from "../../customer/base/Customer";
import { CustomerSnapshotService } from "../customerSnapshot.service";

@graphql.Resolver(() => CustomerSnapshot)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class CustomerSnapshotResolverBase {
  constructor(
    protected readonly service: CustomerSnapshotService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "CustomerSnapshot",
    action: "read",
    possession: "any",
  })
  async _customerSnapshotsMeta(
    @graphql.Args() args: CustomerSnapshotFindManyArgs
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

  @graphql.Query(() => [CustomerSnapshot])
  @nestAccessControl.UseRoles({
    resource: "CustomerSnapshot",
    action: "read",
    possession: "any",
  })
  async customerSnapshots(
    @graphql.Args() args: CustomerSnapshotFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<CustomerSnapshot[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "CustomerSnapshot",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => CustomerSnapshot, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "CustomerSnapshot",
    action: "read",
    possession: "own",
  })
  async customerSnapshot(
    @graphql.Args() args: CustomerSnapshotFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<CustomerSnapshot | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "CustomerSnapshot",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => CustomerSnapshot)
  @nestAccessControl.UseRoles({
    resource: "CustomerSnapshot",
    action: "create",
    possession: "any",
  })
  async createCustomerSnapshot(
    @graphql.Args() args: CreateCustomerSnapshotArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<CustomerSnapshot> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "CustomerSnapshot",
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
        `providing the properties: ${properties} on ${"CustomerSnapshot"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        customerId: args.data.customerId
          ? {
              connect: args.data.customerId,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => CustomerSnapshot)
  @nestAccessControl.UseRoles({
    resource: "CustomerSnapshot",
    action: "update",
    possession: "any",
  })
  async updateCustomerSnapshot(
    @graphql.Args() args: UpdateCustomerSnapshotArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<CustomerSnapshot | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "CustomerSnapshot",
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
        `providing the properties: ${properties} on ${"CustomerSnapshot"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          customerId: args.data.customerId
            ? {
                connect: args.data.customerId,
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

  @graphql.Mutation(() => CustomerSnapshot)
  @nestAccessControl.UseRoles({
    resource: "CustomerSnapshot",
    action: "delete",
    possession: "any",
  })
  async deleteCustomerSnapshot(
    @graphql.Args() args: DeleteCustomerSnapshotArgs
  ): Promise<CustomerSnapshot | null> {
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

  @graphql.ResolveField(() => Customer, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "CustomerSnapshot",
    action: "read",
    possession: "any",
  })
  async customerId(
    @graphql.Parent() parent: CustomerSnapshot,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Customer | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Customer",
    });
    const result = await this.service.getCustomerId(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
