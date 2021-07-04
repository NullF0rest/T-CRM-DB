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
import { PaymentOptionService } from "../paymentOption.service";
import { PaymentOptionCreateInput } from "./PaymentOptionCreateInput";
import { PaymentOptionWhereInput } from "./PaymentOptionWhereInput";
import { PaymentOptionWhereUniqueInput } from "./PaymentOptionWhereUniqueInput";
import { PaymentOptionFindManyArgs } from "./PaymentOptionFindManyArgs";
import { PaymentOptionUpdateInput } from "./PaymentOptionUpdateInput";
import { PaymentOption } from "./PaymentOption";
import { PaymentLedgerWhereInput } from "../../paymentLedger/base/PaymentLedgerWhereInput";
import { PaymentLedger } from "../../paymentLedger/base/PaymentLedger";

export class PaymentOptionControllerBase {
  constructor(
    protected readonly service: PaymentOptionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: PaymentOption })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: PaymentOptionCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaymentOption> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "PaymentOption",
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
        `providing the properties: ${properties} on ${"PaymentOption"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        cardNumber: true,
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [PaymentOption] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => PaymentOptionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaymentOption[]> {
    const args = plainToClass(PaymentOptionFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PaymentOption",
    });
    const results = await this.service.findMany({
      ...args,
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
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: PaymentOption })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: PaymentOptionWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaymentOption | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "PaymentOption",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        cardNumber: true,
        createdAt: true,
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
    resource: "PaymentOption",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: PaymentOption })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: PaymentOptionWhereUniqueInput,
    @common.Body()
    data: PaymentOptionUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaymentOption | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentOption",
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
        `providing the properties: ${properties} on ${"PaymentOption"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          cardNumber: true,
          createdAt: true,
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
    resource: "PaymentOption",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: PaymentOption })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: PaymentOptionWhereUniqueInput
  ): Promise<PaymentOption | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          cardNumber: true,
          createdAt: true,
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
  @common.Get("/:id/paymentLedger")
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => PaymentLedgerWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyPaymentLedger(
    @common.Req() request: Request,
    @common.Param() params: PaymentOptionWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaymentLedger[]> {
    const query: PaymentLedgerWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PaymentLedger",
    });
    const results = await this.service.findPaymentLedger(params.id, {
      where: query,
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
  @common.Post("/:id/paymentLedger")
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "update",
    possession: "any",
  })
  async createPaymentLedger(
    @common.Param() params: PaymentOptionWhereUniqueInput,
    @common.Body() body: PaymentOptionWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      paymentLedger: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentOption",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentOption"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/paymentLedger")
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "update",
    possession: "any",
  })
  async updatePaymentLedger(
    @common.Param() params: PaymentOptionWhereUniqueInput,
    @common.Body() body: PaymentOptionWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      paymentLedger: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentOption",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentOption"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/paymentLedger")
  @nestAccessControl.UseRoles({
    resource: "PaymentOption",
    action: "update",
    possession: "any",
  })
  async deletePaymentLedger(
    @common.Param() params: PaymentOptionWhereUniqueInput,
    @common.Body() body: PaymentOptionWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      paymentLedger: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PaymentOption",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"PaymentOption"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
