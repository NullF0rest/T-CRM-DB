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
import { CreateCompanyArgs } from "./CreateCompanyArgs";
import { UpdateCompanyArgs } from "./UpdateCompanyArgs";
import { DeleteCompanyArgs } from "./DeleteCompanyArgs";
import { CompanyFindManyArgs } from "./CompanyFindManyArgs";
import { CompanyFindUniqueArgs } from "./CompanyFindUniqueArgs";
import { Company } from "./Company";
import { PackageFindManyArgs } from "../../package/base/PackageFindManyArgs";
import { Package } from "../../package/base/Package";
import { SimCardFindManyArgs } from "../../simCard/base/SimCardFindManyArgs";
import { SimCard } from "../../simCard/base/SimCard";
import { CompanyService } from "../company.service";

@graphql.Resolver(() => Company)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class CompanyResolverBase {
  constructor(
    protected readonly service: CompanyService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "any",
  })
  async _companiesMeta(
    @graphql.Args() args: CompanyFindManyArgs
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

  @graphql.Query(() => [Company])
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "any",
  })
  async companies(
    @graphql.Args() args: CompanyFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Company[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Company",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Company, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "own",
  })
  async company(
    @graphql.Args() args: CompanyFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Company | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Company",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Company)
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "create",
    possession: "any",
  })
  async createCompany(
    @graphql.Args() args: CreateCompanyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Company> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Company",
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
        `providing the properties: ${properties} on ${"Company"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Company)
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  async updateCompany(
    @graphql.Args() args: UpdateCompanyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Company | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Company",
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
        `providing the properties: ${properties} on ${"Company"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
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

  @graphql.Mutation(() => Company)
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "delete",
    possession: "any",
  })
  async deleteCompany(
    @graphql.Args() args: DeleteCompanyArgs
  ): Promise<Company | null> {
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

  @graphql.ResolveField(() => [Package])
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "any",
  })
  async packages(
    @graphql.Parent() parent: Company,
    @graphql.Args() args: PackageFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Package[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Package",
    });
    const results = await this.service.findPackages(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [SimCard])
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "any",
  })
  async simCards(
    @graphql.Parent() parent: Company,
    @graphql.Args() args: SimCardFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SimCard[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SimCard",
    });
    const results = await this.service.findSimCards(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
