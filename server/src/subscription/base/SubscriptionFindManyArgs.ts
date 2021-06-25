import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { SubscriptionWhereInput } from "./SubscriptionWhereInput";
import { Type } from "class-transformer";
import { SubscriptionOrderByInput } from "./SubscriptionOrderByInput";

@ArgsType()
class SubscriptionFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => SubscriptionWhereInput,
  })
  @Field(() => SubscriptionWhereInput, { nullable: true })
  @Type(() => SubscriptionWhereInput)
  where?: SubscriptionWhereInput;

  @ApiProperty({
    required: false,
    type: SubscriptionOrderByInput,
  })
  @Field(() => SubscriptionOrderByInput, { nullable: true })
  @Type(() => SubscriptionOrderByInput)
  orderBy?: SubscriptionOrderByInput;

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

export { SubscriptionFindManyArgs };
