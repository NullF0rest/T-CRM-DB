import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PackageWhereInput } from "./PackageWhereInput";
import { Type } from "class-transformer";
import { PackageOrderByInput } from "./PackageOrderByInput";

@ArgsType()
class PackageFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PackageWhereInput,
  })
  @Field(() => PackageWhereInput, { nullable: true })
  @Type(() => PackageWhereInput)
  where?: PackageWhereInput;

  @ApiProperty({
    required: false,
    type: PackageOrderByInput,
  })
  @Field(() => PackageOrderByInput, { nullable: true })
  @Type(() => PackageOrderByInput)
  orderBy?: PackageOrderByInput;

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

export { PackageFindManyArgs };
