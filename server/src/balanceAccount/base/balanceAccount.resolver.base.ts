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
import { CreateBalanceAccountArgs } from "./CreateBalanceAccountArgs";
import { UpdateBalanceAccountArgs } from "./UpdateBalanceAccountArgs";
import { DeleteBalanceAccountArgs } from "./DeleteBalanceAccountArgs";
import { BalanceAccountFindManyArgs } from "./BalanceAccountFindManyArgs";
import { BalanceAccountFindUniqueArgs } from "./BalanceAccountFindUniqueArgs";
import { BalanceAccount } from "./BalanceAccount";
import { InvoiceFindManyArgs } from "../../invoice/base/InvoiceFindManyArgs";
import { Invoice } from "../../invoice/base/Invoice";
import { TransactionFindManyArgs } from "../../transaction/base/TransactionFindManyArgs";
import { Transaction } from "../../transaction/base/Transaction";
import { Customer } from "../../customer/base/Customer";
import { PaymentLedger } from "../../paymentLedger/base/PaymentLedger";
import { BalanceAccountService } from "../balanceAccount.service";

@graphql.Resolver(() => BalanceAccount)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class BalanceAccountResolverBase {
  constructor(
    protected readonly service: BalanceAccountService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "BalanceAccount",
    action: "read",
    possession: "any",
  })
  async _balanceAccountsMeta(
    @graphql.Args() args: BalanceAccountFindManyArgs
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

  @graphql.Query(() => [BalanceAccount])
  @nestAccessControl.UseRoles({
    resource: "BalanceAccount",
    action: "read",
    possession: "any",
  })
  async balanceAccounts(
    @graphql.Args() args: BalanceAccountFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<BalanceAccount[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "BalanceAccount",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => BalanceAccount, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "BalanceAccount",
    action: "read",
    possession: "own",
  })
  async balanceAccount(
    @graphql.Args() args: BalanceAccountFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<BalanceAccount | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "BalanceAccount",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => BalanceAccount)
  @nestAccessControl.UseRoles({
    resource: "BalanceAccount",
    action: "create",
    possession: "any",
  })
  async createBalanceAccount(
    @graphql.Args() args: CreateBalanceAccountArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<BalanceAccount> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "BalanceAccount",
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
        `providing the properties: ${properties} on ${"BalanceAccount"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        customer: args.data.customer
          ? {
              connect: args.data.customer,
            }
          : undefined,

        paymentLedger: args.data.paymentLedger
          ? {
              connect: args.data.paymentLedger,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => BalanceAccount)
  @nestAccessControl.UseRoles({
    resource: "BalanceAccount",
    action: "update",
    possession: "any",
  })
  async updateBalanceAccount(
    @graphql.Args() args: UpdateBalanceAccountArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<BalanceAccount | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "BalanceAccount",
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
        `providing the properties: ${properties} on ${"BalanceAccount"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          customer: args.data.customer
            ? {
                connect: args.data.customer,
              }
            : undefined,

          paymentLedger: args.data.paymentLedger
            ? {
                connect: args.data.paymentLedger,
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

  @graphql.Mutation(() => BalanceAccount)
  @nestAccessControl.UseRoles({
    resource: "BalanceAccount",
    action: "delete",
    possession: "any",
  })
  async deleteBalanceAccount(
    @graphql.Args() args: DeleteBalanceAccountArgs
  ): Promise<BalanceAccount | null> {
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
    resource: "BalanceAccount",
    action: "read",
    possession: "any",
  })
  async invoices(
    @graphql.Parent() parent: BalanceAccount,
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

  @graphql.ResolveField(() => [Transaction])
  @nestAccessControl.UseRoles({
    resource: "BalanceAccount",
    action: "read",
    possession: "any",
  })
  async transactions(
    @graphql.Parent() parent: BalanceAccount,
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

  @graphql.ResolveField(() => Customer, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "BalanceAccount",
    action: "read",
    possession: "any",
  })
  async customer(
    @graphql.Parent() parent: BalanceAccount,
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

  @graphql.ResolveField(() => PaymentLedger, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "BalanceAccount",
    action: "read",
    possession: "any",
  })
  async paymentLedger(
    @graphql.Parent() parent: BalanceAccount,
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
}
