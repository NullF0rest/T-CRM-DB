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
import { SimCardService } from "../simCard.service";
import { SimCardCreateInput } from "./SimCardCreateInput";
import { SimCardWhereInput } from "./SimCardWhereInput";
import { SimCardWhereUniqueInput } from "./SimCardWhereUniqueInput";
import { SimCardFindManyArgs } from "./SimCardFindManyArgs";
import { SimCardUpdateInput } from "./SimCardUpdateInput";
import { SimCard } from "./SimCard";
import { AddonPackageWhereInput } from "../../addonPackage/base/AddonPackageWhereInput";
import { AddonPackage } from "../../addonPackage/base/AddonPackage";
import { SimCardSnapshotWhereInput } from "../../simCardSnapshot/base/SimCardSnapshotWhereInput";
import { SimCardSnapshot } from "../../simCardSnapshot/base/SimCardSnapshot";

export class SimCardControllerBase {
  constructor(
    protected readonly service: SimCardService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: SimCard })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: SimCardCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<SimCard> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "SimCard",
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
        `providing the properties: ${properties} on ${"SimCard"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        company: {
          connect: data.company,
        },

        customer: data.customer
          ? {
              connect: data.customer,
            }
          : undefined,

        package: data.package
          ? {
              connect: data.package,
            }
          : undefined,
      },
      select: {
        activationDay: true,

        company: {
          select: {
            id: true,
          },
        },

        c_id: true,
        createdAt: true,

        customer: {
          select: {
            id: true,
          },
        },

        id: true,
        number: true,

        package: {
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
    resource: "SimCard",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [SimCard] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SimCardFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<SimCard[]> {
    const args = plainToClass(SimCardFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SimCard",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        activationDay: true,

        company: {
          select: {
            id: true,
          },
        },

        c_id: true,
        createdAt: true,

        customer: {
          select: {
            id: true,
          },
        },

        id: true,
        number: true,

        package: {
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
    resource: "SimCard",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: SimCard })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: SimCardWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<SimCard | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "SimCard",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        activationDay: true,

        company: {
          select: {
            id: true,
          },
        },

        c_id: true,
        createdAt: true,

        customer: {
          select: {
            id: true,
          },
        },

        id: true,
        number: true,

        package: {
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
    resource: "SimCard",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: SimCard })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: SimCardWhereUniqueInput,
    @common.Body()
    data: SimCardUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<SimCard | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SimCard",
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
        `providing the properties: ${properties} on ${"SimCard"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          company: {
            connect: data.company,
          },

          customer: data.customer
            ? {
                connect: data.customer,
              }
            : undefined,

          package: data.package
            ? {
                connect: data.package,
              }
            : undefined,
        },
        select: {
          activationDay: true,

          company: {
            select: {
              id: true,
            },
          },

          c_id: true,
          createdAt: true,

          customer: {
            select: {
              id: true,
            },
          },

          id: true,
          number: true,

          package: {
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
    resource: "SimCard",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: SimCard })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: SimCardWhereUniqueInput
  ): Promise<SimCard | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          activationDay: true,

          company: {
            select: {
              id: true,
            },
          },

          c_id: true,
          createdAt: true,

          customer: {
            select: {
              id: true,
            },
          },

          id: true,
          number: true,

          package: {
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
  @common.Get("/:id/addonPackages")
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => AddonPackageWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyAddonPackages(
    @common.Req() request: Request,
    @common.Param() params: SimCardWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<AddonPackage[]> {
    const query: AddonPackageWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "AddonPackage",
    });
    const results = await this.service.findAddonPackages(params.id, {
      where: query,
      select: {
        createdAt: true,
        description: true,
        id: true,
        name: true,
        price: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/addonPackages")
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "update",
    possession: "any",
  })
  async createAddonPackages(
    @common.Param() params: SimCardWhereUniqueInput,
    @common.Body() body: SimCardWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      addonPackages: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SimCard",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SimCard"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/addonPackages")
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "update",
    possession: "any",
  })
  async updateAddonPackages(
    @common.Param() params: SimCardWhereUniqueInput,
    @common.Body() body: SimCardWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      addonPackages: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SimCard",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SimCard"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/addonPackages")
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "update",
    possession: "any",
  })
  async deleteAddonPackages(
    @common.Param() params: SimCardWhereUniqueInput,
    @common.Body() body: SimCardWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      addonPackages: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SimCard",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SimCard"} is forbidden for roles: ${roles}`
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
  @common.Get("/:id/snapshot")
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => SimCardSnapshotWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManySnapshot(
    @common.Req() request: Request,
    @common.Param() params: SimCardWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<SimCardSnapshot[]> {
    const query: SimCardSnapshotWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SimCardSnapshot",
    });
    const results = await this.service.findSnapshot(params.id, {
      where: query,
      select: {
        createdAt: true,
        id: true,

        simCard: {
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
  @common.Post("/:id/snapshot")
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "update",
    possession: "any",
  })
  async createSnapshot(
    @common.Param() params: SimCardWhereUniqueInput,
    @common.Body() body: SimCardWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      snapshot: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SimCard",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SimCard"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/snapshot")
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "update",
    possession: "any",
  })
  async updateSnapshot(
    @common.Param() params: SimCardWhereUniqueInput,
    @common.Body() body: SimCardWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      snapshot: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SimCard",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SimCard"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/snapshot")
  @nestAccessControl.UseRoles({
    resource: "SimCard",
    action: "update",
    possession: "any",
  })
  async deleteSnapshot(
    @common.Param() params: SimCardWhereUniqueInput,
    @common.Body() body: SimCardWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      snapshot: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SimCard",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SimCard"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
