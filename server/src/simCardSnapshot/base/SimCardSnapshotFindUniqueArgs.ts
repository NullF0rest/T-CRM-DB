import { ArgsType, Field } from "@nestjs/graphql";
import { SimCardSnapshotWhereUniqueInput } from "./SimCardSnapshotWhereUniqueInput";

@ArgsType()
class SimCardSnapshotFindUniqueArgs {
  @Field(() => SimCardSnapshotWhereUniqueInput, { nullable: false })
  where!: SimCardSnapshotWhereUniqueInput;
}

export { SimCardSnapshotFindUniqueArgs };
