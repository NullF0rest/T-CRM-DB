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
import { CreateSubscriptionArgs } from "./CreateSubscriptionArgs";
import { UpdateSubscriptionArgs } from "./UpdateSubscriptionArgs";
import { DeleteSubscriptionArgs } from "./DeleteSubscriptionArgs";
import { SubscriptionFindManyArgs } from "./SubscriptionFindManyArgs";
import { SubscriptionFindUniqueArgs } from "./SubscriptionFindUniqueArgs";
import { Subscription } from "./Subscription";
import { BalanceAccountFindManyArgs } from "../../balanceAccount/base/BalanceAccountFindManyArgs";
import { BalanceAccount } from "../../balanceAccount/base/BalanceAccount";
import { Customer } from "../../customer/base/Customer";
import { Invoice } from "../../invoice/base/Invoice";
import { PaymentLedger } from "../../paymentLedger/base/PaymentLedger";
import { SubscriptionService } from "../subscription.service";

@graphql.Resolver(() => Subscription)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SubscriptionResolverBase {
  constructor(
    protected readonly service: SubscriptionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "any",
  })
  async _subscriptionsMeta(
    @graphql.Args() args: SubscriptionFindManyArgs
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

  @graphql.Query(() => [Subscription])
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "any",
  })
  async subscriptions(
    @graphql.Args() args: SubscriptionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Subscription[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Subscription",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Subscription, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "own",
  })
  async subscription(
    @graphql.Args() args: SubscriptionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Subscription | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Subscription",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Subscription)
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "create",
    possession: "any",
  })
  async createSubscription(
    @graphql.Args() args: CreateSubscriptionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Subscription> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Subscription",
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
        `providing the properties: ${properties} on ${"Subscription"} creation is forbidden for roles: ${roles}`
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

        invoice: args.data.invoice
          ? {
              connect: args.data.invoice,
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

  @graphql.Mutation(() => Subscription)
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "update",
    possession: "any",
  })
  async updateSubscription(
    @graphql.Args() args: UpdateSubscriptionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Subscription | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Subscription",
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
        `providing the properties: ${properties} on ${"Subscription"} update is forbidden for roles: ${roles}`
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

          invoice: args.data.invoice
            ? {
                connect: args.data.invoice,
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

  @graphql.Mutation(() => Subscription)
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "delete",
    possession: "any",
  })
  async deleteSubscription(
    @graphql.Args() args: DeleteSubscriptionArgs
  ): Promise<Subscription | null> {
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

  @graphql.ResolveField(() => [BalanceAccount])
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "any",
  })
  async balanceAccounts(
    @graphql.Parent() parent: Subscription,
    @graphql.Args() args: BalanceAccountFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<BalanceAccount[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "BalanceAccount",
    });
    const results = await this.service.findBalanceAccounts(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Customer, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "any",
  })
  async customer(
    @graphql.Parent() parent: Subscription,
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

  @graphql.ResolveField(() => Invoice, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "any",
  })
  async invoice(
    @graphql.Parent() parent: Subscription,
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

  @graphql.ResolveField(() => PaymentLedger, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "any",
  })
  async paymentLedger(
    @graphql.Parent() parent: Subscription,
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
