import { ArgsType, Field } from "@nestjs/graphql";
import { TransactionCreateInput } from "./TransactionCreateInput";

@ArgsType()
class CreateTransactionArgs {
  @Field(() => TransactionCreateInput, { nullable: false })
  data!: TransactionCreateInput;
}

export { CreateTransactionArgs };
