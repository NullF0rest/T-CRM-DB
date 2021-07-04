import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BalanceAccountWhereUniqueInput } from "../../balanceAccount/base/BalanceAccountWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { CustomerWhereUniqueInput } from "../../customer/base/CustomerWhereUniqueInput";
@InputType()
class PaymentLedgerUpdateInput {
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
  balanceAccounts?: BalanceAccountWhereUniqueInput;

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
}
export { PaymentLedgerUpdateInput };
