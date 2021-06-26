import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StringFilter } from "../../util/StringFilter";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { SimCardWhereUniqueInput } from "../../simCard/base/SimCardWhereUniqueInput";
import { JsonNullableFilter } from "../../util/JsonNullableFilter";
@InputType()
class SimCardSnapshotWhereInput {
  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

  @ApiProperty({
    required: false,
    type: () => SimCardWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => SimCardWhereUniqueInput)
  @IsOptional()
  @Field(() => SimCardWhereUniqueInput, {
    nullable: true,
  })
  simCard?: SimCardWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: JsonNullableFilter,
  })
  @Type(() => JsonNullableFilter)
  @IsOptional()
  @Field(() => JsonNullableFilter, {
    nullable: true,
  })
  simCardSnapshot?: JsonNullableFilter;
}
export { SimCardSnapshotWhereInput };
