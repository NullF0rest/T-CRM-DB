import { ArgsType, Field } from "@nestjs/graphql";
import { BalanceAccountCreateInput } from "./BalanceAccountCreateInput";

@ArgsType()
class CreateBalanceAccountArgs {
  @Field(() => BalanceAccountCreateInput, { nullable: false })
  data!: BalanceAccountCreateInput;
}

export { CreateBalanceAccountArgs };
