import { ArgsType, Field } from "@nestjs/graphql";
import { SimCardSnapshotWhereUniqueInput } from "./SimCardSnapshotWhereUniqueInput";

@ArgsType()
class DeleteSimCardSnapshotArgs {
  @Field(() => SimCardSnapshotWhereUniqueInput, { nullable: false })
  where!: SimCardSnapshotWhereUniqueInput;
}

export { DeleteSimCardSnapshotArgs };
