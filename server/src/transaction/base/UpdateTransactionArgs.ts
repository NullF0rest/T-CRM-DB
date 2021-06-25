import { ArgsType, Field } from "@nestjs/graphql";
import { TransactionWhereUniqueInput } from "./TransactionWhereUniqueInput";
import { TransactionUpdateInput } from "./TransactionUpdateInput";

@ArgsType()
class UpdateTransactionArgs {
  @Field(() => TransactionWhereUniqueInput, { nullable: false })
  where!: TransactionWhereUniqueInput;
  @Field(() => TransactionUpdateInput, { nullable: false })
  data!: TransactionUpdateInput;
}

export { UpdateTransactionArgs };
