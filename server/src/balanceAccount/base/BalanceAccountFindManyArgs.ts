import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BalanceAccountWhereInput } from "./BalanceAccountWhereInput";
import { Type } from "class-transformer";
import { BalanceAccountOrderByInput } from "./BalanceAccountOrderByInput";

@ArgsType()
class BalanceAccountFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => BalanceAccountWhereInput,
  })
  @Field(() => BalanceAccountWhereInput, { nullable: true })
  @Type(() => BalanceAccountWhereInput)
  where?: BalanceAccountWhereInput;

  @ApiProperty({
    required: false,
    type: BalanceAccountOrderByInput,
  })
  @Field(() => BalanceAccountOrderByInput, { nullable: true })
  @Type(() => BalanceAccountOrderByInput)
  orderBy?: BalanceAccountOrderByInput;

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

export { BalanceAccountFindManyArgs };
