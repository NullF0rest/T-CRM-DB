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
import { CreateInvoiceArgs } from "./CreateInvoiceArgs";
import { UpdateInvoiceArgs } from "./UpdateInvoiceArgs";
import { DeleteInvoiceArgs } from "./DeleteInvoiceArgs";
import { InvoiceFindManyArgs } from "./InvoiceFindManyArgs";
import { InvoiceFindUniqueArgs } from "./InvoiceFindUniqueArgs";
import { Invoice } from "./Invoice";
import { BalanceAccount } from "../../balanceAccount/base/BalanceAccount";
import { PaymentLedger } from "../../paymentLedger/base/PaymentLedger";
import { Subscription } from "../../subscription/base/Subscription";
import { Transaction } from "../../transaction/base/Transaction";
import { InvoiceService } from "../invoice.service";

@graphql.Resolver(() => Invoice)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class InvoiceResolverBase {
  constructor(
    protected readonly service: InvoiceService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "read",
    possession: "any",
  })
  async _invoicesMeta(
    @graphql.Args() args: InvoiceFindManyArgs
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

  @graphql.Query(() => [Invoice])
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "read",
    possession: "any",
  })
  async invoices(
    @graphql.Args() args: InvoiceFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Invoice[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Invoice",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Invoice, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "read",
    possession: "own",
  })
  async invoice(
    @graphql.Args() args: InvoiceFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Invoice | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Invoice",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Invoice)
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "create",
    possession: "any",
  })
  async createInvoice(
    @graphql.Args() args: CreateInvoiceArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Invoice> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Invoice",
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
        `providing the properties: ${properties} on ${"Invoice"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        balanceAccount: args.data.balanceAccount
          ? {
              connect: args.data.balanceAccount,
            }
          : undefined,

        paymentLedger: args.data.paymentLedger
          ? {
              connect: args.data.paymentLedger,
            }
          : undefined,

        subscriptions: args.data.subscriptions
          ? {
              connect: args.data.subscriptions,
            }
          : undefined,

        transaction: args.data.transaction
          ? {
              connect: args.data.transaction,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Invoice)
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "update",
    possession: "any",
  })
  async updateInvoice(
    @graphql.Args() args: UpdateInvoiceArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Invoice | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Invoice",
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
        `providing the properties: ${properties} on ${"Invoice"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          balanceAccount: args.data.balanceAccount
            ? {
                connect: args.data.balanceAccount,
              }
            : undefined,

          paymentLedger: args.data.paymentLedger
            ? {
                connect: args.data.paymentLedger,
              }
            : undefined,

          subscriptions: args.data.subscriptions
            ? {
                connect: args.data.subscriptions,
              }
            : undefined,

          transaction: args.data.transaction
            ? {
                connect: args.data.transaction,
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

  @graphql.Mutation(() => Invoice)
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "delete",
    possession: "any",
  })
  async deleteInvoice(
    @graphql.Args() args: DeleteInvoiceArgs
  ): Promise<Invoice | null> {
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

  @graphql.ResolveField(() => BalanceAccount, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "read",
    possession: "any",
  })
  async balanceAccount(
    @graphql.Parent() parent: Invoice,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<BalanceAccount | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "BalanceAccount",
    });
    const result = await this.service.getBalanceAccount(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => PaymentLedger, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "read",
    possession: "any",
  })
  async paymentLedger(
    @graphql.Parent() parent: Invoice,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaymentLedger | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PaymentLedger",
    });
    const result = await this.service.getPaymentLedger(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Subscription, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "read",
    possession: "any",
  })
  async subscriptions(
    @graphql.Parent() parent: Invoice,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Subscription | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Subscription",
    });
    const result = await this.service.getSubscriptions(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Transaction, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "read",
    possession: "any",
  })
  async transaction(
    @graphql.Parent() parent: Invoice,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Transaction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Transaction",
    });
    const result = await this.service.getTransaction(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
