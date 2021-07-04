import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentOptionWhereInput } from "./PaymentOptionWhereInput";
import { Type } from "class-transformer";
import { PaymentOptionOrderByInput } from "./PaymentOptionOrderByInput";

@ArgsType()
class PaymentOptionFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PaymentOptionWhereInput,
  })
  @Field(() => PaymentOptionWhereInput, { nullable: true })
  @Type(() => PaymentOptionWhereInput)
  where?: PaymentOptionWhereInput;

  @ApiProperty({
    required: false,
    type: PaymentOptionOrderByInput,
  })
  @Field(() => PaymentOptionOrderByInput, { nullable: true })
  @Type(() => PaymentOptionOrderByInput)
  orderBy?: PaymentOptionOrderByInput;

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

export { PaymentOptionFindManyArgs };
