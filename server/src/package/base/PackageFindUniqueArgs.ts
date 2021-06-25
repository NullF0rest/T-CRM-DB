import { ArgsType, Field } from "@nestjs/graphql";
import { PackageWhereUniqueInput } from "./PackageWhereUniqueInput";

@ArgsType()
class PackageFindUniqueArgs {
  @Field(() => PackageWhereUniqueInput, { nullable: false })
  where!: PackageWhereUniqueInput;
}

export { PackageFindUniqueArgs };
