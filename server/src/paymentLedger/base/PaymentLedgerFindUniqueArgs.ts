import { ArgsType, Field } from "@nestjs/graphql";
import { PaymentLedgerWhereUniqueInput } from "./PaymentLedgerWhereUniqueInput";

@ArgsType()
class PaymentLedgerFindUniqueArgs {
  @Field(() => PaymentLedgerWhereUniqueInput, { nullable: false })
  where!: PaymentLedgerWhereUniqueInput;
}

export { PaymentLedgerFindUniqueArgs };
