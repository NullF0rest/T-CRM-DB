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
import { CreatePaymentOptionArgs } from "./CreatePaymentOptionArgs";
import { UpdatePaymentOptionArgs } from "./UpdatePaymentOptionArgs";
import { DeletePaymentOptionArgs } from "./DeletePaymentOptionArgs";
import { PaymentOptionFindManyArgs } from "./PaymentOptionFindManyArgs";
import { PaymentOptionFindUniqueArgs } from "./PaymentOptionFindUniqueArgs";
import { PaymentOption } from "./PaymentOption";
import { PaymentLedgerFindManyArgs } from "../../paymentLedger/base/PaymentLedgerFindManyArgs";
import { PaymentLedger } from "../../paymentLedger/base/PaymentLedger";
import { Invoice } from "../../invoice/base/Invoice";
import { PaymentOptionService } from "../paymentOption.service";

@graphql.Resolver(() => PaymentOption)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PaymentOptionResolverBase {
  constructor(
    protected readonly service: PaymentOptionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "read",
    possession: "any",
  })
  async _paymentOptionsMeta(
    @graphql.Args() args: PaymentOptionFindManyArgs
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

  @graphql.Query(() => [PaymentOption])
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "read",
    possession: "any",
  })
  async paymentOptions(
    @graphql.Args() args: PaymentOptionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaymentOption[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PaymentOption",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => PaymentOption, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "read",
    possession: "own",
  })
  async paymentOption(
    @graphql.Args() args: PaymentOptionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaymentOption | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "PaymentOption",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => PaymentOption)
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "create",
    possession: "any",
  })
  async createPaymentOption(
    @graphql.Args() args: CreatePaymentOptionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaymentOption> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "PaymentOption",
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
        `providing the properties: ${properties} on ${"PaymentOption"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        invoice: args.data.invoice
          ? {
              connect: args.data.invoice,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => PaymentOption)
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "update",
    possession: "any",
  })
  async updatePaymentOption(
    @graphql.Args() args: UpdatePaymentOptionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaymentOption | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentOption",
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
        `providing the properties: ${properties} on ${"PaymentOption"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          invoice: args.data.invoice
            ? {
                connect: args.data.invoice,
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

  @graphql.Mutation(() => PaymentOption)
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "delete",
    possession: "any",
  })
  async deletePaymentOption(
    @graphql.Args() args: DeletePaymentOptionArgs
  ): Promise<PaymentOption | null> {
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

  @graphql.ResolveField(() => [PaymentLedger])
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "read",
    possession: "any",
  })
  async paymentLedger(
    @graphql.Parent() parent: PaymentOption,
    @graphql.Args() args: PaymentLedgerFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaymentLedger[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PaymentLedger",
    });
    const results = await this.service.findPaymentLedger(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Invoice, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "read",
    possession: "any",
  })
  async invoice(
    @graphql.Parent() parent: PaymentOption,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Invoice | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Invoice",
    });
    const result = await this.service.getInvoice(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
