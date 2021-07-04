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
import { SubscriptionService } from "../subscription.service";
import { SubscriptionCreateInput } from "./SubscriptionCreateInput";
import { SubscriptionWhereInput } from "./SubscriptionWhereInput";
import { SubscriptionWhereUniqueInput } from "./SubscriptionWhereUniqueInput";
import { SubscriptionFindManyArgs } from "./SubscriptionFindManyArgs";
import { SubscriptionUpdateInput } from "./SubscriptionUpdateInput";
import { Subscription } from "./Subscription";

export class SubscriptionControllerBase {
  constructor(
    protected readonly service: SubscriptionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Subscription })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: SubscriptionCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Subscription> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Subscription",
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
        `providing the properties: ${properties} on ${"Subscription"} creation is forbidden for roles: ${roles}`
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

        invoice: data.invoice
          ? {
              connect: data.invoice,
            }
          : undefined,

        paymentLedger: data.paymentLedger
          ? {
              connect: data.paymentLedger,
            }
          : undefined,
      },
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
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Subscription] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SubscriptionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Subscription[]> {
    const args = plainToClass(SubscriptionFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Subscription",
    });
    const results = await this.service.findMany({
      ...args,
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
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Subscription })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: SubscriptionWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Subscription | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Subscription",
    });
    const result = await this.service.findOne({
      where: params,
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
    resource: "Subscription",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Subscription })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: SubscriptionWhereUniqueInput,
    @common.Body()
    data: SubscriptionUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Subscription | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Subscription",
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
        `providing the properties: ${properties} on ${"Subscription"} update is forbidden for roles: ${roles}`
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

          invoice: data.invoice
            ? {
                connect: data.invoice,
              }
            : undefined,

          paymentLedger: data.paymentLedger
            ? {
                connect: data.paymentLedger,
              }
            : undefined,
        },
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
    resource: "Subscription",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Subscription })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: SubscriptionWhereUniqueInput
  ): Promise<Subscription | null> {
    try {
      return await this.service.delete({
        where: params,
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
