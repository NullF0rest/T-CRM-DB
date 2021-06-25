import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TransactionWhereInput } from "./TransactionWhereInput";
import { Type } from "class-transformer";
import { TransactionOrderByInput } from "./TransactionOrderByInput";

@ArgsType()
class TransactionFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => TransactionWhereInput,
  })
  @Field(() => TransactionWhereInput, { nullable: true })
  @Type(() => TransactionWhereInput)
  where?: TransactionWhereInput;

  @ApiProperty({
    required: false,
    type: TransactionOrderByInput,
  })
  @Field(() => TransactionOrderByInput, { nullable: true })
  @Type(() => TransactionOrderByInput)
  orderBy?: TransactionOrderByInput;

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

export { TransactionFindManyArgs };
