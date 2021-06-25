import { ArgsType, Field } from "@nestjs/graphql";
import { TransactionWhereUniqueInput } from "./TransactionWhereUniqueInput";

@ArgsType()
class DeleteTransactionArgs {
  @Field(() => TransactionWhereUniqueInput, { nullable: false })
  where!: TransactionWhereUniqueInput;
}

export { DeleteTransactionArgs };
