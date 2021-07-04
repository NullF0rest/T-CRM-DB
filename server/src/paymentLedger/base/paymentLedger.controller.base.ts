import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { PaymentLedgerService } from "../paymentLedger.service";
import { PaymentLedgerCreateInput } from "./PaymentLedgerCreateInput";
import { PaymentLedgerWhereInput } from "./PaymentLedgerWhereInput";
import { PaymentLedgerWhereUniqueInput } from "./PaymentLedgerWhereUniqueInput";
import { PaymentLedgerFindManyArgs } from "./PaymentLedgerFindManyArgs";
import { PaymentLedgerUpdateInput } from "./PaymentLedgerUpdateInput";
import { PaymentLedger } from "./PaymentLedger";
import { InvoiceWhereInput } from "../../invoice/base/InvoiceWhereInput";
import { Invoice } from "../../invoice/base/Invoice";
import { PaymentOptionWhereInput } from "../../paymentOption/base/PaymentOptionWhereInput";
import { PaymentOption } from "../../paymentOption/base/PaymentOption";
import { SubscriptionWhereInput } from "../../subscription/base/SubscriptionWhereInput";
import { Subscription } from "../../subscription/base/Subscription";
import { TransactionWhereInput } from "../../transaction/base/TransactionWhereInput";
import { Transaction } from "../../transaction/base/Transaction";

export class PaymentLedgerControllerBase {
  constructor(
    protected readonly service: PaymentLedgerService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: PaymentLedger })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: PaymentLedgerCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaymentLedger> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"PaymentLedger"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        balanceAccounts: {
          connect: data.balanceAccounts,
        },

        customer: data.customer
          ? {
              connect: data.customer,
            }
          : undefined,
      },
      select: {
        balanceAccounts: {
          select: {
            id: true,
          },
        },

        createdAt: true,

        customer: {
          select: {
            id: true,
          },
        },

        id: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [PaymentLedger] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => PaymentLedgerFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaymentLedger[]> {
    const args = plainToClass(PaymentLedgerFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PaymentLedger",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        balanceAccounts: {
          select: {
            id: true,
          },
        },

        createdAt: true,

        customer: {
          select: {
            id: true,
          },
        },

        id: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: PaymentLedger })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaymentLedger | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "PaymentLedger",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        balanceAccounts: {
          select: {
            id: true,
          },
        },

        createdAt: true,

        customer: {
          select: {
            id: true,
          },
        },

        id: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: PaymentLedger })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @common.Body()
    data: PaymentLedgerUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaymentLedger | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"PaymentLedger"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          balanceAccounts: {
            connect: data.balanceAccounts,
          },

          customer: data.customer
            ? {
                connect: data.customer,
              }
            : undefined,
        },
        select: {
          balanceAccounts: {
            select: {
              id: true,
            },
          },

          createdAt: true,

          customer: {
            select: {
              id: true,
            },
          },

          id: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: PaymentLedger })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: PaymentLedgerWhereUniqueInput
  ): Promise<PaymentLedger | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          balanceAccounts: {
            select: {
              id: true,
            },
          },

          createdAt: true,

          customer: {
            select: {
              id: true,
            },
          },

          id: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/invoices")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => InvoiceWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyInvoices(
    @common.Req() request: Request,
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Invoice[]> {
    const query: InvoiceWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Invoice",
    });
    const results = await this.service.findInvoices(params.id, {
      where: query,
      select: {
        balanceAccount: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,

        paymentLedger: {
          select: {
            id: true,
          },
        },

        subscriptions: {
          select: {
            id: true,
          },
        },

        transaction: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/invoices")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  async createInvoices(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @common.Body() body: PaymentLedgerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      invoices: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentLedger"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/invoices")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  async updateInvoices(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @common.Body() body: PaymentLedgerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      invoices: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentLedger"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/invoices")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  async deleteInvoices(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @common.Body() body: PaymentLedgerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      invoices: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentLedger"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/paymentOptions")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => PaymentOptionWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyPaymentOptions(
    @common.Req() request: Request,
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaymentOption[]> {
    const query: PaymentOptionWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PaymentOption",
    });
    const results = await this.service.findPaymentOptions(params.id, {
      where: query,
      select: {
        cardNumber: true,
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/paymentOptions")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  async createPaymentOptions(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @common.Body() body: PaymentLedgerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      paymentOptions: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentLedger"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/paymentOptions")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  async updatePaymentOptions(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @common.Body() body: PaymentLedgerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      paymentOptions: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentLedger"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/paymentOptions")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  async deletePaymentOptions(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @common.Body() body: PaymentLedgerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      paymentOptions: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentLedger"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/subscriptions")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => SubscriptionWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManySubscriptions(
    @common.Req() request: Request,
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Subscription[]> {
    const query: SubscriptionWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Subscription",
    });
    const results = await this.service.findSubscriptions(params.id, {
      where: query,
      select: {
        createdAt: true,

        customer: {
          select: {
            id: true,
          },
        },

        id: true,

        invoice: {
          select: {
            id: true,
          },
        },

        paymentLedger: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/subscriptions")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  async createSubscriptions(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @common.Body() body: PaymentLedgerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      subscriptions: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentLedger"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/subscriptions")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  async updateSubscriptions(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @common.Body() body: PaymentLedgerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      subscriptions: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentLedger"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/subscriptions")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  async deleteSubscriptions(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @common.Body() body: PaymentLedgerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      subscriptions: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentLedger"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/transactions")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => TransactionWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyTransactions(
    @common.Req() request: Request,
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Transaction[]> {
    const query: TransactionWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Transaction",
    });
    const results = await this.service.findTransactions(params.id, {
      where: query,
      select: {
        amount: true,

        balanceAccount: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,

        invoices: {
          select: {
            id: true,
          },
        },

        method: true,
        name: true,
        notes: true,

        paymentLedger: {
          select: {
            id: true,
          },
        },

        Time: true,
        type: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/transactions")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  async createTransactions(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @common.Body() body: PaymentLedgerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      transactions: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentLedger"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/transactions")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  async updateTransactions(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @common.Body() body: PaymentLedgerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      transactions: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentLedger"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/transactions")
  @nestAccessControl.UseRoles({
    resource: "PaymentLedger",
    action: "update",
    possession: "any",
  })
  async deleteTransactions(
    @common.Param() params: PaymentLedgerWhereUniqueInput,
    @common.Body() body: PaymentLedgerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      transactions: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentLedger",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentLedger"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
