import { ArgsType, Field } from "@nestjs/graphql";
import { BalanceAccountWhereUniqueInput } from "./BalanceAccountWhereUniqueInput";

@ArgsType()
class BalanceAccountFindUniqueArgs {
  @Field(() => BalanceAccountWhereUniqueInput, { nullable: false })
  where!: BalanceAccountWhereUniqueInput;
}

export { BalanceAccountFindUniqueArgs };
