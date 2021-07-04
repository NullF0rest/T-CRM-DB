import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BalanceAccount } from "../../balanceAccount/base/BalanceAccount";
import { ValidateNested, IsDate, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Customer } from "../../customer/base/Customer";
import { Invoice } from "../../invoice/base/Invoice";
import { PaymentOption } from "../../paymentOption/base/PaymentOption";
import { Subscription } from "../../subscription/base/Subscription";
import { Transaction } from "../../transaction/base/Transaction";
@ObjectType()
class PaymentLedger {
  @ApiProperty({
    required: true,
    type: () => BalanceAccount,
  })
  @ValidateNested()
  @Type(() => BalanceAccount)
  balanceAccounts?: BalanceAccount;

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
    type: () => [Invoice],
  })
  @ValidateNested()
  @Type(() => Invoice)
  @IsOptional()
  invoices?: Array<Invoice>;

  @ApiProperty({
    required: false,
    type: () => [PaymentOption],
  })
  @ValidateNested()
  @Type(() => PaymentOption)
  @IsOptional()
  paymentOptions?: Array<PaymentOption>;

  @ApiProperty({
    required: false,
    type: () => [Subscription],
  })
  @ValidateNested()
  @Type(() => Subscription)
  @IsOptional()
  subscriptions?: Array<Subscription>;

  @ApiProperty({
    required: false,
    type: () => [Transaction],
  })
  @ValidateNested()
  @Type(() => Transaction)
  @IsOptional()
  transactions?: Array<Transaction>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { PaymentLedger };
