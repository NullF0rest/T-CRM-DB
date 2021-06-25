import { ArgsType, Field } from "@nestjs/graphql";
import { CustomerSnapshotCreateInput } from "./CustomerSnapshotCreateInput";

@ArgsType()
class CreateCustomerSnapshotArgs {
  @Field(() => CustomerSnapshotCreateInput, { nullable: false })
  data!: CustomerSnapshotCreateInput;
}

export { CreateCustomerSnapshotArgs };
