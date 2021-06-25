import { ArgsType, Field } from "@nestjs/graphql";
import { SimCardCreateInput } from "./SimCardCreateInput";

@ArgsType()
class CreateSimCardArgs {
  @Field(() => SimCardCreateInput, { nullable: false })
  data!: SimCardCreateInput;
}

export { CreateSimCardArgs };
