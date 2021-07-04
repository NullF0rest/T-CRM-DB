import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BalanceAccountWhereUniqueInput } from "../../balanceAccount/base/BalanceAccountWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { PaymentLedgerWhereUniqueInput } from "../../paymentLedger/base/PaymentLedgerWhereUniqueInput";
import { SubscriptionWhereUniqueInput } from "../../subscription/base/SubscriptionWhereUniqueInput";
import { TransactionWhereUniqueInput } from "../../transaction/base/TransactionWhereUniqueInput";
@InputType()
class InvoiceUpdateInput {
  @ApiProperty({
    required: false,
    type: () => BalanceAccountWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => BalanceAccountWhereUniqueInput)
  @IsOptional()
  @Field(() => BalanceAccountWhereUniqueInput, {
    nullable: true,
  })
  balanceAccount?: BalanceAccountWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => PaymentLedgerWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PaymentLedgerWhereUniqueInput)
  @IsOptional()
  @Field(() => PaymentLedgerWhereUniqueInput, {
    nullable: true,
  })
  paymentLedger?: PaymentLedgerWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => SubscriptionWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => SubscriptionWhereUniqueInput)
  @IsOptional()
  @Field(() => SubscriptionWhereUniqueInput, {
    nullable: true,
  })
  subscriptions?: SubscriptionWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: () => TransactionWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TransactionWhereUniqueInput)
  @IsOptional()
  @Field(() => TransactionWhereUniqueInput, {
    nullable: true,
  })
  transaction?: TransactionWhereUniqueInput;
}
export { InvoiceUpdateInput };
