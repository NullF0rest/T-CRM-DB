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
import { CreatePaymentLedgerArgs } from "./CreatePaymentLedgerArgs";
import { UpdatePaymentLedgerArgs } from "./UpdatePaymentLedgerArgs";
import { DeletePaymentLedgerArgs } from "./DeletePaymentLedgerArgs";
import { PaymentLedgerFindManyArgs } from "./PaymentLedgerFindManyArgs";
import { PaymentLedgerFindUniqueArgs } from "./PaymentLedgerFindUniqueArgs";
import { PaymentLedger } from "./PaymentLedger";
import { InvoiceFindManyArgs } from "../../invoice/base/InvoiceFindManyArgs";
import { Invoice } from "../../invoice/base/Invoice";
import { PaymentOptionFindManyArgs } from "../../paymentOption/base/PaymentOptionFindManyArgs";
import { PaymentOption } from "../../paymentOption/base/PaymentOption";
import { SubscriptionFindManyArgs } from "../../subscription/base/SubscriptionFindManyArgs";
import { Subscription } from "../../subscription/base/Subscription";
import { TransactionFindManyArgs } from "../../transaction/base/TransactionFindManyArgs";
import { Transaction } from "../../transaction/base/Transaction";
import { BalanceAccount } from "../../balanceAccount/base/BalanceAccount";
import { Customer } from "../../customer/base/Customer";
import { PaymentLedgerService } from "../paymentLedger.service";

@graphql.Resolver(() => PaymentLedger)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PaymentLedgerResolverBase {
  constructor(
    protected readonly service: PaymentLedgerService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "any",
  })
  async _paymentLedgersMeta(
    @graphql.Args() args: PaymentLedgerFindManyArgs
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

  @graphql.Query(() => [PaymentLedger])
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "any",
  })
  async paymentLedgers(
    @graphql.Args() args: PaymentLedgerFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaymentLedger[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PaymentLedger",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => PaymentLedger, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "own",
  })
  async paymentLedger(
    @graphql.Args() args: PaymentLedgerFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaymentLedger | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "PaymentLedger",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => PaymentLedger)
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "create",
    possession: "any",
  })
  async createPaymentLedger(
    @graphql.Args() args: CreatePaymentLedgerArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaymentLedger> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "PaymentLedger",
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
        `providing the properties: ${properties} on ${"PaymentLedger"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        balanceAccounts: {
          connect: args.data.balanceAccounts,
        },

        customer: args.data.customer
          ? {
              connect: args.data.customer,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => PaymentLedger)
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  async updatePaymentLedger(
    @graphql.Args() args: UpdatePaymentLedgerArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaymentLedger | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
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
        `providing the properties: ${properties} on ${"PaymentLedger"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          balanceAccounts: {
            connect: args.data.balanceAccounts,
          },

          customer: args.data.customer
            ? {
                connect: args.data.customer,
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

  @graphql.Mutation(() => PaymentLedger)
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "delete",
    possession: "any",
  })
  async deletePaymentLedger(
    @graphql.Args() args: DeletePaymentLedgerArgs
  ): Promise<PaymentLedger | null> {
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

  @graphql.ResolveField(() => [Invoice])
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "any",
  })
  async invoices(
    @graphql.Parent() parent: PaymentLedger,
    @graphql.Args() args: InvoiceFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Invoice[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Invoice",
    });
    const results = await this.service.findInvoices(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [PaymentOption])
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "any",
  })
  async paymentOptions(
    @graphql.Parent() parent: PaymentLedger,
    @graphql.Args() args: PaymentOptionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaymentOption[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PaymentOption",
    });
    const results = await this.service.findPaymentOptions(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Subscription])
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "any",
  })
  async subscriptions(
    @graphql.Parent() parent: PaymentLedger,
    @graphql.Args() args: SubscriptionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Subscription[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Subscription",
    });
    const results = await this.service.findSubscriptions(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Transaction])
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "any",
  })
  async transactions(
    @graphql.Parent() parent: PaymentLedger,
    @graphql.Args() args: TransactionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Transaction[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Transaction",
    });
    const results = await this.service.findTransactions(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => BalanceAccount, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "any",
  })
  async balanceAccounts(
    @graphql.Parent() parent: PaymentLedger,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<BalanceAccount | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "BalanceAccount",
    });
    const result = await this.service.getBalanceAccounts(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Customer, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "any",
  })
  async customer(
    @graphql.Parent() parent: PaymentLedger,
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
}
