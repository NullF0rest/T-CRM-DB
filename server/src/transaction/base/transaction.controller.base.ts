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
import { TransactionService } from "../transaction.service";
import { TransactionCreateInput } from "./TransactionCreateInput";
import { TransactionWhereInput } from "./TransactionWhereInput";
import { TransactionWhereUniqueInput } from "./TransactionWhereUniqueInput";
import { TransactionFindManyArgs } from "./TransactionFindManyArgs";
import { TransactionUpdateInput } from "./TransactionUpdateInput";
import { Transaction } from "./Transaction";

export class TransactionControllerBase {
  constructor(
    protected readonly service: TransactionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Transaction })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: TransactionCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Transaction> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Transaction",
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
        `providing the properties: ${properties} on ${"Transaction"} creation is forbidden for roles: ${roles}`
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
      },
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
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Transaction] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => TransactionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Transaction[]> {
    const args = plainToClass(TransactionFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Transaction",
    });
    const results = await this.service.findMany({
      ...args,
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
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Transaction })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: TransactionWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Transaction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Transaction",
    });
    const result = await this.service.findOne({
      where: params,
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
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Transaction })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body()
    data: TransactionUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Transaction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Transaction",
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
        `providing the properties: ${properties} on ${"Transaction"} update is forbidden for roles: ${roles}`
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
        },
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
    resource: "Transaction",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Transaction })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: TransactionWhereUniqueInput
  ): Promise<Transaction | null> {
    try {
      return await this.service.delete({
        where: params,
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
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
