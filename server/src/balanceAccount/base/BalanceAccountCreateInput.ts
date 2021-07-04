import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, ValidateNested, IsOptional } from "class-validator";
import { CustomerWhereUniqueInput } from "../../customer/base/CustomerWhereUniqueInput";
import { Type } from "class-transformer";
import { PaymentLedgerWhereUniqueInput } from "../../paymentLedger/base/PaymentLedgerWhereUniqueInput";
@InputType()
class BalanceAccountCreateInput {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Number)
  balance!: number;

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
export { BalanceAccountCreateInput };
