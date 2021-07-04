import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Address } from "../../address/base/Address";
import {
  ValidateNested,
  IsOptional,
  IsDate,
  IsString,
  IsBoolean,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { BalanceAccount } from "../../balanceAccount/base/BalanceAccount";
import { PaymentLedger } from "../../paymentLedger/base/PaymentLedger";
import { SimCard } from "../../simCard/base/SimCard";
import { CustomerSnapshot } from "../../customerSnapshot/base/CustomerSnapshot";
import { EnumCustomerStatus } from "./EnumCustomerStatus";
import { Subscription } from "../../subscription/base/Subscription";
@ObjectType()
class Customer {
  @ApiProperty({
    required: false,
    type: () => Address,
  })
  @ValidateNested()
  @Type(() => Address)
  @IsOptional()
  address?: Address;

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
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  dateOfBirth!: Date | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  email!: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  fullName!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

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
  isDeleted!: boolean | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  nationalId!: string | null;

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
  paymentLedgers?: PaymentLedger | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  phoneNumber!: string | null;

  @ApiProperty({
    required: false,
    type: () => [SimCard],
  })
  @ValidateNested()
  @Type(() => SimCard)
  @IsOptional()
  simCards?: Array<SimCard>;

  @ApiProperty({
    required: false,
    type: () => [CustomerSnapshot],
  })
  @ValidateNested()
  @Type(() => CustomerSnapshot)
  @IsOptional()
  snapshots?: Array<CustomerSnapshot>;

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
    type: () => Subscription,
  })
  @ValidateNested()
  @Type(() => Subscription)
  subscriptions?: Subscription;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Customer };
