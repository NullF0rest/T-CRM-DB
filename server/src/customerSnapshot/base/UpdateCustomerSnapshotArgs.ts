import { ArgsType, Field } from "@nestjs/graphql";
import { CustomerSnapshotWhereUniqueInput } from "./CustomerSnapshotWhereUniqueInput";
import { CustomerSnapshotUpdateInput } from "./CustomerSnapshotUpdateInput";

@ArgsType()
class UpdateCustomerSnapshotArgs {
  @Field(() => CustomerSnapshotWhereUniqueInput, { nullable: false })
  where!: CustomerSnapshotWhereUniqueInput;
  @Field(() => CustomerSnapshotUpdateInput, { nullable: false })
  data!: CustomerSnapshotUpdateInput;
}

export { UpdateCustomerSnapshotArgs };
