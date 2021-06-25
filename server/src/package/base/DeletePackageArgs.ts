import { ArgsType, Field } from "@nestjs/graphql";
import { PackageWhereUniqueInput } from "./PackageWhereUniqueInput";

@ArgsType()
class DeletePackageArgs {
  @Field(() => PackageWhereUniqueInput, { nullable: false })
  where!: PackageWhereUniqueInput;
}

export { DeletePackageArgs };
