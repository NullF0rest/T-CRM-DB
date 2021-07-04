import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, ValidateNested } from "class-validator";
import { CustomerWhereUniqueInput } from "../../customer/base/CustomerWhereUniqueInput";
import { Type } from "class-transformer";
import { PaymentLedgerWhereUniqueInput } from "../../paymentLedger/base/PaymentLedgerWhereUniqueInput";
@InputType()
class BalanceAccountUpdateInput {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  balance?: number;

  @ApiProperty({
    required: false,
    type: () => CustomerWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CustomerWhereUniqueInput)
  @IsOptional()
  @Field(() => CustomerWhereUniqueInput, {
    nullable: true,
  })
  customer?: CustomerWhereUniqueInput;

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
}
export { BalanceAccountUpdateInput };
