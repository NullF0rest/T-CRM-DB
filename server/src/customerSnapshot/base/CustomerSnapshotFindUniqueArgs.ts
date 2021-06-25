import { ArgsType, Field } from "@nestjs/graphql";
import { CustomerSnapshotWhereUniqueInput } from "./CustomerSnapshotWhereUniqueInput";

@ArgsType()
class CustomerSnapshotFindUniqueArgs {
  @Field(() => CustomerSnapshotWhereUniqueInput, { nullable: false })
  where!: CustomerSnapshotWhereUniqueInput;
}

export { CustomerSnapshotFindUniqueArgs };
