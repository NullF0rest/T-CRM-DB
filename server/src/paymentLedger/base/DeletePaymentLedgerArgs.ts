import { ArgsType, Field } from "@nestjs/graphql";
import { PaymentLedgerWhereUniqueInput } from "./PaymentLedgerWhereUniqueInput";

@ArgsType()
class DeletePaymentLedgerArgs {
  @Field(() => PaymentLedgerWhereUniqueInput, { nullable: false })
  where!: PaymentLedgerWhereUniqueInput;
}

export { DeletePaymentLedgerArgs };
