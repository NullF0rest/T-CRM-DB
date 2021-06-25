import { ArgsType, Field } from "@nestjs/graphql";
import { PackageWhereUniqueInput } from "./PackageWhereUniqueInput";
import { PackageUpdateInput } from "./PackageUpdateInput";

@ArgsType()
class UpdatePackageArgs {
  @Field(() => PackageWhereUniqueInput, { nullable: false })
  where!: PackageWhereUniqueInput;
  @Field(() => PackageUpdateInput, { nullable: false })
  data!: PackageUpdateInput;
}

export { UpdatePackageArgs };
