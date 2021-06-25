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
import { CustomerSnapshotService } from "../customerSnapshot.service";
import { CustomerSnapshotCreateInput } from "./CustomerSnapshotCreateInput";
import { CustomerSnapshotWhereInput } from "./CustomerSnapshotWhereInput";
import { CustomerSnapshotWhereUniqueInput } from "./CustomerSnapshotWhereUniqueInput";
import { CustomerSnapshotFindManyArgs } from "./CustomerSnapshotFindManyArgs";
import { CustomerSnapshotUpdateInput } from "./CustomerSnapshotUpdateInput";
import { CustomerSnapshot } from "./CustomerSnapshot";
import { Customer } from "../../customer/base/Customer";

export class CustomerSnapshotControllerBase {
  constructor(
    protected readonly service: CustomerSnapshotService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "CustomerSnapshot",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: CustomerSnapshot })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: CustomerSnapshotCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<CustomerSnapshot> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "CustomerSnapshot",
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
        `providing the properties: ${properties} on ${"CustomerSnapshot"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        customerId: data.customerId
          ? {
              connect: data.customerId,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        Customer: true,

        customerId: {
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
    resource: "CustomerSnapshot",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [CustomerSnapshot] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => CustomerSnapshotFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<CustomerSnapshot[]> {
    const args = plainToClass(CustomerSnapshotFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "CustomerSnapshot",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        Customer: true,

        customerId: {
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
    resource: "CustomerSnapshot",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: CustomerSnapshot })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: CustomerSnapshotWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<CustomerSnapshot | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "CustomerSnapshot",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        Customer: true,

        customerId: {
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
    resource: "CustomerSnapshot",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: CustomerSnapshot })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: CustomerSnapshotWhereUniqueInput,
    @common.Body()
    data: CustomerSnapshotUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<CustomerSnapshot | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "CustomerSnapshot",
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
        `providing the properties: ${properties} on ${"CustomerSnapshot"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          customerId: data.customerId
            ? {
                connect: data.customerId,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          Customer: true,

          customerId: {
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
    resource: "CustomerSnapshot",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: CustomerSnapshot })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: CustomerSnapshotWhereUniqueInput
  ): Promise<CustomerSnapshot | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          Customer: true,

          customerId: {
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
}
