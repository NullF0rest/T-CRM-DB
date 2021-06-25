import { ArgsType, Field } from "@nestjs/graphql";
import { CustomerSnapshotWhereUniqueInput } from "./CustomerSnapshotWhereUniqueInput";

@ArgsType()
class DeleteCustomerSnapshotArgs {
  @Field(() => CustomerSnapshotWhereUniqueInput, { nullable: false })
  where!: CustomerSnapshotWhereUniqueInput;
}

export { DeleteCustomerSnapshotArgs };
