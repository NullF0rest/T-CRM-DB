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
import { BalanceAccountService } from "../balanceAccount.service";
import { BalanceAccountCreateInput } from "./BalanceAccountCreateInput";
import { BalanceAccountWhereInput } from "./BalanceAccountWhereInput";
import { BalanceAccountWhereUniqueInput } from "./BalanceAccountWhereUniqueInput";
import { BalanceAccountFindManyArgs } from "./BalanceAccountFindManyArgs";
import { BalanceAccountUpdateInput } from "./BalanceAccountUpdateInput";
import { BalanceAccount } from "./BalanceAccount";
import { TransactionWhereInput } from "../../transaction/base/TransactionWhereInput";
import { Transaction } from "../../transaction/base/Transaction";

export class BalanceAccountControllerBase {
  constructor(
    protected readonly service: BalanceAccountService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "BalanceAccount",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: BalanceAccount })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: BalanceAccountCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<BalanceAccount> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "BalanceAccount",
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
        `providing the properties: ${properties} on ${"BalanceAccount"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        customer: data.customer
          ? {
              connect: data.customer,
            }
          : undefined,
      },
      select: {
        balance: true,
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
    resource: "BalanceAccount",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [BalanceAccount] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => BalanceAccountFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<BalanceAccount[]> {
    const args = plainToClass(BalanceAccountFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "BalanceAccount",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        balance: true,
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
    resource: "BalanceAccount",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: BalanceAccount })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: BalanceAccountWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<BalanceAccount | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "BalanceAccount",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        balance: true,
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
    resource: "BalanceAccount",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: BalanceAccount })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: BalanceAccountWhereUniqueInput,
    @common.Body()
    data: BalanceAccountUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<BalanceAccount | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "BalanceAccount",
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
        `providing the properties: ${properties} on ${"BalanceAccount"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          customer: data.customer
            ? {
                connect: data.customer,
              }
            : undefined,
        },
        select: {
          balance: true,
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
    resource: "BalanceAccount",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: BalanceAccount })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: BalanceAccountWhereUniqueInput
  ): Promise<BalanceAccount | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          balance: true,
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
  @common.Get("/:id/transactions")
  @nestAccessControl.UseRoles({
    resource: "BalanceAccount",
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
    @common.Param() params: BalanceAccountWhereUniqueInput,
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
        method: true,
        name: true,
        notes: true,
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
    resource: "BalanceAccount",
    action: "update",
    possession: "any",
  })
  async createTransactions(
    @common.Param() params: BalanceAccountWhereUniqueInput,
    @common.Body() body: BalanceAccountWhereUniqueInput[],
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
      resource: "BalanceAccount",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"BalanceAccount"} is forbidden for roles: ${roles}`
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
    resource: "BalanceAccount",
    action: "update",
    possession: "any",
  })
  async updateTransactions(
    @common.Param() params: BalanceAccountWhereUniqueInput,
    @common.Body() body: BalanceAccountWhereUniqueInput[],
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
      resource: "BalanceAccount",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"BalanceAccount"} is forbidden for roles: ${roles}`
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
    resource: "BalanceAccount",
    action: "update",
    possession: "any",
  })
  async deleteTransactions(
    @common.Param() params: BalanceAccountWhereUniqueInput,
    @common.Body() body: BalanceAccountWhereUniqueInput[],
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
      resource: "BalanceAccount",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"BalanceAccount"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
