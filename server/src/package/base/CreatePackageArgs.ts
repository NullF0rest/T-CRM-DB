import { ArgsType, Field } from "@nestjs/graphql";
import { PackageCreateInput } from "./PackageCreateInput";

@ArgsType()
class CreatePackageArgs {
  @Field(() => PackageCreateInput, { nullable: false })
  data!: PackageCreateInput;
}

export { CreatePackageArgs };
