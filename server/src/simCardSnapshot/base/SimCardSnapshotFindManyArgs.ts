import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { SimCardSnapshotWhereInput } from "./SimCardSnapshotWhereInput";
import { Type } from "class-transformer";
import { SimCardSnapshotOrderByInput } from "./SimCardSnapshotOrderByInput";

@ArgsType()
class SimCardSnapshotFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => SimCardSnapshotWhereInput,
  })
  @Field(() => SimCardSnapshotWhereInput, { nullable: true })
  @Type(() => SimCardSnapshotWhereInput)
  where?: SimCardSnapshotWhereInput;

  @ApiProperty({
    required: false,
    type: SimCardSnapshotOrderByInput,
  })
  @Field(() => SimCardSnapshotOrderByInput, { nullable: true })
  @Type(() => SimCardSnapshotOrderByInput)
  orderBy?: SimCardSnapshotOrderByInput;

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

export { SimCardSnapshotFindManyArgs };
