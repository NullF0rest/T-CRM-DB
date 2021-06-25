import { ArgsType, Field } from "@nestjs/graphql";
import { SimCardWhereUniqueInput } from "./SimCardWhereUniqueInput";
import { SimCardUpdateInput } from "./SimCardUpdateInput";

@ArgsType()
class UpdateSimCardArgs {
  @Field(() => SimCardWhereUniqueInput, { nullable: false })
  where!: SimCardWhereUniqueInput;
  @Field(() => SimCardUpdateInput, { nullable: false })
  data!: SimCardUpdateInput;
}

export { UpdateSimCardArgs };
