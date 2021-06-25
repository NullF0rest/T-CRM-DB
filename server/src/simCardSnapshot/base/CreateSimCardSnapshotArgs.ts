import { ArgsType, Field } from "@nestjs/graphql";
import { SimCardSnapshotCreateInput } from "./SimCardSnapshotCreateInput";

@ArgsType()
class CreateSimCardSnapshotArgs {
  @Field(() => SimCardSnapshotCreateInput, { nullable: false })
  data!: SimCardSnapshotCreateInput;
}

export { CreateSimCardSnapshotArgs };
