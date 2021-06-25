import { ArgsType, Field } from "@nestjs/graphql";
import { BalanceAccountWhereUniqueInput } from "./BalanceAccountWhereUniqueInput";

@ArgsType()
class DeleteBalanceAccountArgs {
  @Field(() => BalanceAccountWhereUniqueInput, { nullable: false })
  where!: BalanceAccountWhereUniqueInput;
}

export { DeleteBalanceAccountArgs };
