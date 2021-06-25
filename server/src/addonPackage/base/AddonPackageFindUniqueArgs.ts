import { ArgsType, Field } from "@nestjs/graphql";
import { AddonPackageWhereUniqueInput } from "./AddonPackageWhereUniqueInput";

@ArgsType()
class AddonPackageFindUniqueArgs {
  @Field(() => AddonPackageWhereUniqueInput, { nullable: false })
  where!: AddonPackageWhereUniqueInput;
}

export { AddonPackageFindUniqueArgs };
