import { ArgsType, Field } from "@nestjs/graphql";
import { SimCardWhereUniqueInput } from "./SimCardWhereUniqueInput";

@ArgsType()
class DeleteSimCardArgs {
  @Field(() => SimCardWhereUniqueInput, { nullable: false })
  where!: SimCardWhereUniqueInput;
}

export { DeleteSimCardArgs };
