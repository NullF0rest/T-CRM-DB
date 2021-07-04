import { ArgsType, Field } from "@nestjs/graphql";
import { PaymentOptionWhereUniqueInput } from "./PaymentOptionWhereUniqueInput";
import { PaymentOptionUpdateInput } from "./PaymentOptionUpdateInput";

@ArgsType()
class UpdatePaymentOptionArgs {
  @Field(() => PaymentOptionWhereUniqueInput, { nullable: false })
  where!: PaymentOptionWhereUniqueInput;
  @Field(() => PaymentOptionUpdateInput, { nullable: false })
  data!: PaymentOptionUpdateInput;
}

export { UpdatePaymentOptionArgs };
