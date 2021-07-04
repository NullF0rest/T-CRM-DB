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
import { InvoiceService } from "../invoice.service";
import { InvoiceCreateInput } from "./InvoiceCreateInput";
import { InvoiceWhereInput } from "./InvoiceWhereInput";
import { InvoiceWhereUniqueInput } from "./InvoiceWhereUniqueInput";
import { InvoiceFindManyArgs } from "./InvoiceFindManyArgs";
import { InvoiceUpdateInput } from "./InvoiceUpdateInput";
import { Invoice } from "./Invoice";
import { PaymentOptionWhereInput } from "../../paymentOption/base/PaymentOptionWhereInput";
import { PaymentOption } from "../../paymentOption/base/PaymentOption";

export class InvoiceControllerBase {
  constructor(
    protected readonly service: InvoiceService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Invoice })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: InvoiceCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Invoice> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Invoice",
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
        `providing the properties: ${properties} on ${"Invoice"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        balanceAccount: data.balanceAccount
          ? {
              connect: data.balanceAccount,
            }
          : undefined,

        paymentLedger: data.paymentLedger
          ? {
              connect: data.paymentLedger,
            }
          : undefined,

        subscriptions: data.subscriptions
          ? {
              connect: data.subscriptions,
            }
          : undefined,

        transaction: data.transaction
          ? {
              connect: data.transaction,
            }
          : undefined,
      },
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
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Invoice] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => InvoiceFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Invoice[]> {
    const args = plainToClass(InvoiceFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Invoice",
    });
    const results = await this.service.findMany({
      ...args,
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
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Invoice })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: InvoiceWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Invoice | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Invoice",
    });
    const result = await this.service.findOne({
      where: params,
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
    resource: "Invoice",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Invoice })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: InvoiceWhereUniqueInput,
    @common.Body()
    data: InvoiceUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Invoice | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Invoice",
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
        `providing the properties: ${properties} on ${"Invoice"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          balanceAccount: data.balanceAccount
            ? {
                connect: data.balanceAccount,
              }
            : undefined,

          paymentLedger: data.paymentLedger
            ? {
                connect: data.paymentLedger,
              }
            : undefined,

          subscriptions: data.subscriptions
            ? {
                connect: data.subscriptions,
              }
            : undefined,

          transaction: data.transaction
            ? {
                connect: data.transaction,
              }
            : undefined,
        },
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
    resource: "Invoice",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Invoice })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: InvoiceWhereUniqueInput
  ): Promise<Invoice | null> {
    try {
      return await this.service.delete({
        where: params,
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
  @common.Get("/:id/paymentOptions")
  @nestAccessControl.UseRoles({
    resource: "Invoice",
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
    @common.Param() params: InvoiceWhereUniqueInput,
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

        invoice: {
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
  @common.Post("/:id/paymentOptions")
  @nestAccessControl.UseRoles({
    resource: "Invoice",
    action: "update",
    possession: "any",
  })
  async createPaymentOptions(
    @common.Param() params: InvoiceWhereUniqueInput,
    @common.Body() body: InvoiceWhereUniqueInput[],
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
      resource: "Invoice",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Invoice"} is forbidden for roles: ${roles}`
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
    resource: "Invoice",
    action: "update",
    possession: "any",
  })
  async updatePaymentOptions(
    @common.Param() params: InvoiceWhereUniqueInput,
    @common.Body() body: InvoiceWhereUniqueInput[],
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
      resource: "Invoice",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Invoice"} is forbidden for roles: ${roles}`
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
    resource: "Invoice",
    action: "update",
    possession: "any",
  })
  async deletePaymentOptions(
    @common.Param() params: InvoiceWhereUniqueInput,
    @common.Body() body: InvoiceWhereUniqueInput[],
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
      resource: "Invoice",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Invoice"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
