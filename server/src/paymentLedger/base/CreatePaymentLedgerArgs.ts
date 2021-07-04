import { ArgsType, Field } from "@nestjs/graphql";
import { PaymentLedgerCreateInput } from "./PaymentLedgerCreateInput";

@ArgsType()
class CreatePaymentLedgerArgs {
  @Field(() => PaymentLedgerCreateInput, { nullable: false })
  data!: PaymentLedgerCreateInput;
}

export { CreatePaymentLedgerArgs };
