import { ArgsType, Field } from "@nestjs/graphql";
import { AddonPackageWhereUniqueInput } from "./AddonPackageWhereUniqueInput";

@ArgsType()
class DeleteAddonPackageArgs {
  @Field(() => AddonPackageWhereUniqueInput, { nullable: false })
  where!: AddonPackageWhereUniqueInput;
}

export { DeleteAddonPackageArgs };
