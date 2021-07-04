import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BalanceAccount } from "../../balanceAccount/base/BalanceAccount";
import { ValidateNested, IsOptional, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Customer } from "../../customer/base/Customer";
import { Invoice } from "../../invoice/base/Invoice";
import { PaymentLedger } from "../../paymentLedger/base/PaymentLedger";
@ObjectType()
class Subscription {
  @ApiProperty({
    required: false,
    type: () => [BalanceAccount],
  })
  @ValidateNested()
  @Type(() => BalanceAccount)
  @IsOptional()
  balanceAccounts?: Array<BalanceAccount>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: false,
    type: () => Customer,
  })
  @ValidateNested()
  @Type(() => Customer)
  @IsOptional()
  customer?: Customer;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: () => Invoice,
  })
  @ValidateNested()
  @Type(() => Invoice)
  @IsOptional()
  invoice?: Invoice | null;

  @ApiProperty({
    required: false,
    type: () => PaymentLedger,
  })
  @ValidateNested()
  @Type(() => PaymentLedger)
  @IsOptional()
  paymentLedger?: PaymentLedger | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Subscription };
