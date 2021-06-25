import { ArgsType, Field } from "@nestjs/graphql";
import { SimCardSnapshotWhereUniqueInput } from "./SimCardSnapshotWhereUniqueInput";
import { SimCardSnapshotUpdateInput } from "./SimCardSnapshotUpdateInput";

@ArgsType()
class UpdateSimCardSnapshotArgs {
  @Field(() => SimCardSnapshotWhereUniqueInput, { nullable: false })
  where!: SimCardSnapshotWhereUniqueInput;
  @Field(() => SimCardSnapshotUpdateInput, { nullable: false })
  data!: SimCardSnapshotUpdateInput;
}

export { UpdateSimCardSnapshotArgs };
