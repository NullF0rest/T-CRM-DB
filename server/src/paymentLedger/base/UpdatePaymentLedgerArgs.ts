import { ArgsType, Field } from "@nestjs/graphql";
import { PaymentLedgerWhereUniqueInput } from "./PaymentLedgerWhereUniqueInput";
import { PaymentLedgerUpdateInput } from "./PaymentLedgerUpdateInput";

@ArgsType()
class UpdatePaymentLedgerArgs {
  @Field(() => PaymentLedgerWhereUniqueInput, { nullable: false })
  where!: PaymentLedgerWhereUniqueInput;
  @Field(() => PaymentLedgerUpdateInput, { nullable: false })
  data!: PaymentLedgerUpdateInput;
}

export { UpdatePaymentLedgerArgs };
