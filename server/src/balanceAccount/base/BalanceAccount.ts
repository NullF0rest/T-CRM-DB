import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsDate,
  ValidateNested,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { Customer } from "../../customer/base/Customer";
import { Invoice } from "../../invoice/base/Invoice";
import { PaymentLedger } from "../../paymentLedger/base/PaymentLedger";
import { Subscription } from "../../subscription/base/Subscription";
import { Transaction } from "../../transaction/base/Transaction";
@ObjectType()
class BalanceAccount {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Number)
  balance!: number;

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
    type: () => PaymentLedger,
  })
  @ValidateNested()
  @Type(() => PaymentLedger)
  @IsOptional()
  paymentLedger?: PaymentLedger | null;

  @ApiProperty({
    required: false,
    type: () => Subscription,
  })
  @ValidateNested()
  @Type(() => Subscription)
  @IsOptional()
  subscription?: Subscription | null;

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
export { BalanceAccount };
