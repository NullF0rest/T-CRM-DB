import { ArgsType, Field } from "@nestjs/graphql";
import { BalanceAccountWhereUniqueInput } from "./BalanceAccountWhereUniqueInput";
import { BalanceAccountUpdateInput } from "./BalanceAccountUpdateInput";

@ArgsType()
class UpdateBalanceAccountArgs {
  @Field(() => BalanceAccountWhereUniqueInput, { nullable: false })
  where!: BalanceAccountWhereUniqueInput;
  @Field(() => BalanceAccountUpdateInput, { nullable: false })
  data!: BalanceAccountUpdateInput;
}

export { UpdateBalanceAccountArgs };
