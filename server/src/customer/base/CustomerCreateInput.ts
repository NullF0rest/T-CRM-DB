import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { AddressWhereUniqueInput } from "../../address/base/AddressWhereUniqueInput";
import {
  ValidateNested,
  IsOptional,
  IsDate,
  IsString,
  IsBoolean,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { BalanceAccountWhereUniqueInput } from "../../balanceAccount/base/BalanceAccountWhereUniqueInput";
import { PaymentLedgerWhereUniqueInput } from "../../paymentLedger/base/PaymentLedgerWhereUniqueInput";
import { EnumCustomerStatus } from "./EnumCustomerStatus";
import { SubscriptionWhereUniqueInput } from "../../subscription/base/SubscriptionWhereUniqueInput";
@InputType()
class CustomerCreateInput {
  @ApiProperty({
    required: false,
    type: () => AddressWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => AddressWhereUniqueInput)
  @IsOptional()
  @Field(() => AddressWhereUniqueInput, {
    nullable: true,
  })
  address?: AddressWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => BalanceAccountWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => BalanceAccountWhereUniqueInput)
  @Field(() => BalanceAccountWhereUniqueInput)
  balanceAccount!: BalanceAccountWhereUniqueInput;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  dateOfBirth?: Date | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  email?: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  fullName!: string;

  @ApiProperty({
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  @Field(() => Boolean)
  isActive!: boolean;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  isDeleted?: boolean | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  nationalId?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  notes?: string | null;

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
  paymentLedgers?: PaymentLedgerWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  phoneNumber?: string | null;

  @ApiProperty({
    required: false,
    enum: EnumCustomerStatus,
  })
  @IsEnum(EnumCustomerStatus)
  @IsOptional()
  @Field(() => EnumCustomerStatus, {
    nullable: true,
  })
  status?: "Holiday" | "Retired" | "Working" | "OutOfCompany" | null;

  @ApiProperty({
    required: true,
    type: () => SubscriptionWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => SubscriptionWhereUniqueInput)
  @Field(() => SubscriptionWhereUniqueInput)
  subscriptions!: SubscriptionWhereUniqueInput;
}
export { CustomerCreateInput };
