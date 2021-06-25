import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { AddonPackageWhereInput } from "./AddonPackageWhereInput";
import { Type } from "class-transformer";
import { AddonPackageOrderByInput } from "./AddonPackageOrderByInput";

@ArgsType()
class AddonPackageFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => AddonPackageWhereInput,
  })
  @Field(() => AddonPackageWhereInput, { nullable: true })
  @Type(() => AddonPackageWhereInput)
  where?: AddonPackageWhereInput;

  @ApiProperty({
    required: false,
    type: AddonPackageOrderByInput,
  })
  @Field(() => AddonPackageOrderByInput, { nullable: true })
  @Type(() => AddonPackageOrderByInput)
  orderBy?: AddonPackageOrderByInput;

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

export { AddonPackageFindManyArgs };
