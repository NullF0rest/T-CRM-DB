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
import { SimCardSnapshotService } from "../simCardSnapshot.service";
import { SimCardSnapshotCreateInput } from "./SimCardSnapshotCreateInput";
import { SimCardSnapshotWhereInput } from "./SimCardSnapshotWhereInput";
import { SimCardSnapshotWhereUniqueInput } from "./SimCardSnapshotWhereUniqueInput";
import { SimCardSnapshotFindManyArgs } from "./SimCardSnapshotFindManyArgs";
import { SimCardSnapshotUpdateInput } from "./SimCardSnapshotUpdateInput";
import { SimCardSnapshot } from "./SimCardSnapshot";

export class SimCardSnapshotControllerBase {
  constructor(
    protected readonly service: SimCardSnapshotService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "SimCardSnapshot",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: SimCardSnapshot })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: SimCardSnapshotCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<SimCardSnapshot> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "SimCardSnapshot",
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
        `providing the properties: ${properties} on ${"SimCardSnapshot"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        simCardId: data.simCardId
          ? {
              connect: data.simCardId,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        id: true,

        simCardId: {
          select: {
            id: true,
          },
        },

        simCardSnapshot: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "SimCardSnapshot",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [SimCardSnapshot] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SimCardSnapshotFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<SimCardSnapshot[]> {
    const args = plainToClass(SimCardSnapshotFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SimCardSnapshot",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        id: true,

        simCardId: {
          select: {
            id: true,
          },
        },

        simCardSnapshot: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "SimCardSnapshot",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: SimCardSnapshot })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: SimCardSnapshotWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<SimCardSnapshot | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "SimCardSnapshot",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        id: true,

        simCardId: {
          select: {
            id: true,
          },
        },

        simCardSnapshot: true,
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
    resource: "SimCardSnapshot",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: SimCardSnapshot })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: SimCardSnapshotWhereUniqueInput,
    @common.Body()
    data: SimCardSnapshotUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<SimCardSnapshot | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SimCardSnapshot",
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
        `providing the properties: ${properties} on ${"SimCardSnapshot"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          simCardId: data.simCardId
            ? {
                connect: data.simCardId,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          id: true,

          simCardId: {
            select: {
              id: true,
            },
          },

          simCardSnapshot: true,
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
    resource: "SimCardSnapshot",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: SimCardSnapshot })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: SimCardSnapshotWhereUniqueInput
  ): Promise<SimCardSnapshot | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          id: true,

          simCardId: {
            select: {
              id: true,
            },
          },

          simCardSnapshot: true,
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
