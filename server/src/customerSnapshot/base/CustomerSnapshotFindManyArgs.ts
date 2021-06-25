import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CustomerSnapshotWhereInput } from "./CustomerSnapshotWhereInput";
import { Type } from "class-transformer";
import { CustomerSnapshotOrderByInput } from "./CustomerSnapshotOrderByInput";

@ArgsType()
class CustomerSnapshotFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CustomerSnapshotWhereInput,
  })
  @Field(() => CustomerSnapshotWhereInput, { nullable: true })
  @Type(() => CustomerSnapshotWhereInput)
  where?: CustomerSnapshotWhereInput;

  @ApiProperty({
    required: false,
    type: CustomerSnapshotOrderByInput,
  })
  @Field(() => CustomerSnapshotOrderByInput, { nullable: true })
  @Type(() => CustomerSnapshotOrderByInput)
  orderBy?: CustomerSnapshotOrderByInput;

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

export { CustomerSnapshotFindManyArgs };
