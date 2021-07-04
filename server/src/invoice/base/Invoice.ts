import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BalanceAccount } from "../../balanceAccount/base/BalanceAccount";
import { ValidateNested, IsOptional, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";
import { PaymentLedger } from "../../paymentLedger/base/PaymentLedger";
import { PaymentOption } from "../../paymentOption/base/PaymentOption";
import { Subscription } from "../../subscription/base/Subscription";
import { Transaction } from "../../transaction/base/Transaction";
@ObjectType()
class Invoice {
  @ApiProperty({
    required: false,
    type: () => BalanceAccount,
  })
  @ValidateNested()
  @Type(() => BalanceAccount)
  @IsOptional()
  balanceAccount?: BalanceAccount | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: () => PaymentLedger,
  })
  @ValidateNested()
  @Type(() => PaymentLedger)
  @IsOptional()
  paymentLedger?: PaymentLedger | null;

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
    type: () => Subscription,
  })
  @ValidateNested()
  @Type(() => Subscription)
  @IsOptional()
  subscriptions?: Subscription;

  @ApiProperty({
    required: false,
    type: () => Transaction,
  })
  @ValidateNested()
  @Type(() => Transaction)
  @IsOptional()
  transaction?: Transaction;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Invoice };
