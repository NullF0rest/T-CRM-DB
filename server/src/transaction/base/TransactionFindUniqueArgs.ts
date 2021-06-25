import { ArgsType, Field } from "@nestjs/graphql";
import { TransactionWhereUniqueInput } from "./TransactionWhereUniqueInput";

@ArgsType()
class TransactionFindUniqueArgs {
  @Field(() => TransactionWhereUniqueInput, { nullable: false })
  where!: TransactionWhereUniqueInput;
}

export { TransactionFindUniqueArgs };
