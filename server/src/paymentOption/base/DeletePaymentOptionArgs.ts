import { ArgsType, Field } from "@nestjs/graphql";
import { PaymentOptionWhereUniqueInput } from "./PaymentOptionWhereUniqueInput";

@ArgsType()
class DeletePaymentOptionArgs {
  @Field(() => PaymentOptionWhereUniqueInput, { nullable: false })
  where!: PaymentOptionWhereUniqueInput;
}

export { DeletePaymentOptionArgs };
