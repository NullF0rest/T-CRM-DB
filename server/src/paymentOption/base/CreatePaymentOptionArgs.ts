import { ArgsType, Field } from "@nestjs/graphql";
import { PaymentOptionCreateInput } from "./PaymentOptionCreateInput";

@ArgsType()
class CreatePaymentOptionArgs {
  @Field(() => PaymentOptionCreateInput, { nullable: false })
  data!: PaymentOptionCreateInput;
}

export { CreatePaymentOptionArgs };
