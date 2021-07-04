import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentLedgerWhereInput } from "./PaymentLedgerWhereInput";
import { Type } from "class-transformer";
import { PaymentLedgerOrderByInput } from "./PaymentLedgerOrderByInput";

@ArgsType()
class PaymentLedgerFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PaymentLedgerWhereInput,
  })
  @Field(() => PaymentLedgerWhereInput, { nullable: true })
  @Type(() => PaymentLedgerWhereInput)
  where?: PaymentLedgerWhereInput;

  @ApiProperty({
    required: false,
    type: PaymentLedgerOrderByInput,
  })
  @Field(() => PaymentLedgerOrderByInput, { nullable: true })
  @Type(() => PaymentLedgerOrderByInput)
  orderBy?: PaymentLedgerOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { PaymentLedgerFindManyArgs };
