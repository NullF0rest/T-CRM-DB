import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  ValidateNested,
  IsString,
  IsDate,
  IsEnum,
} from "class-validator";
import { BalanceAccountWhereUniqueInput } from "../../balanceAccount/base/BalanceAccountWhereUniqueInput";
import { Type } from "class-transformer";
import { EnumTransactionType } from "./EnumTransactionType";
@InputType()
class TransactionCreateInput {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  amount?: number | null;

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
  balanceAccount?: BalanceAccountWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  method?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name?: string | null;

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
}
export { TransactionCreateInput };
