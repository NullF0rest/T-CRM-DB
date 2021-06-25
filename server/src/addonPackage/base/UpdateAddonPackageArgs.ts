import { ArgsType, Field } from "@nestjs/graphql";
import { AddonPackageWhereUniqueInput } from "./AddonPackageWhereUniqueInput";
import { AddonPackageUpdateInput } from "./AddonPackageUpdateInput";

@ArgsType()
class UpdateAddonPackageArgs {
  @Field(() => AddonPackageWhereUniqueInput, { nullable: false })
  where!: AddonPackageWhereUniqueInput;
  @Field(() => AddonPackageUpdateInput, { nullable: false })
  data!: AddonPackageUpdateInput;
}

export { UpdateAddonPackageArgs };
