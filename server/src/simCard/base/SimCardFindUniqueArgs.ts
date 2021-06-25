import { ArgsType, Field } from "@nestjs/graphql";
import { SimCardWhereUniqueInput } from "./SimCardWhereUniqueInput";

@ArgsType()
class SimCardFindUniqueArgs {
  @Field(() => SimCardWhereUniqueInput, { nullable: false })
  where!: SimCardWhereUniqueInput;
}

export { SimCardFindUniqueArgs };
