import { ArgsType, Field } from "@nestjs/graphql";
import { AddonPackageCreateInput } from "./AddonPackageCreateInput";

@ArgsType()
class CreateAddonPackageArgs {
  @Field(() => AddonPackageCreateInput, { nullable: false })
  data!: AddonPackageCreateInput;
}

export { CreateAddonPackageArgs };
