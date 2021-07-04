import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  ValidateNested,
  IsDate,
  IsString,
  IsEnum,
} from "class-validator";
import { BalanceAccount } from "../../balanceAccount/base/BalanceAccount";
import { Type } from "class-transformer";
import { Invoice } from "../../invoice/base/Invoice";
import { PaymentLedger } from "../../paymentLedger/base/PaymentLedger";
import { EnumTransactionType } from "./EnumTransactionType";
@ObjectType()
class Transaction {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  amount!: number | null;

  @ApiProperty({
    required: true,
    type: () => BalanceAccount,
  })
  @ValidateNested()
  @Type(() => BalanceAccount)
  balanceAccount?: BalanceAccount;

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
    type: () => Invoice,
  })
  @ValidateNested()
  @Type(() => Invoice)
  @IsOptional()
  invoices?: Invoice | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  method!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  notes!: string | null;

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
  Time!: Date;

  @ApiProperty({
    required: false,
    enum: EnumTransactionType,
  })
  @IsEnum(EnumTransactionType)
  @IsOptional()
  @Field(() => EnumTransactionType, {
    nullable: true,
  })
  type?: "Credit" | "Debit" | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Transaction };
