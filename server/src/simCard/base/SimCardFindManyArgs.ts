import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { SimCardWhereInput } from "./SimCardWhereInput";
import { Type } from "class-transformer";
import { SimCardOrderByInput } from "./SimCardOrderByInput";

@ArgsType()
class SimCardFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => SimCardWhereInput,
  })
  @Field(() => SimCardWhereInput, { nullable: true })
  @Type(() => SimCardWhereInput)
  where?: SimCardWhereInput;

  @ApiProperty({
    required: false,
    type: SimCardOrderByInput,
  })
  @Field(() => SimCardOrderByInput, { nullable: true })
  @Type(() => SimCardOrderByInput)
  orderBy?: SimCardOrderByInput;

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

export { SimCardFindManyArgs };
