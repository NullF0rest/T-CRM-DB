import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { SimCardWhereUniqueInput } from "../../simCard/base/SimCardWhereUniqueInput";
import { ValidateNested, IsOptional, IsJSON } from "class-validator";
import { Type } from "class-transformer";
import { GraphQLJSONObject } from "graphql-type-json";
import { JsonValue } from "type-fest";
@InputType()
class SimCardSnapshotCreateInput {
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
  simCardId?: SimCardWhereUniqueInput | null;

  @ApiProperty({
    required: true,
  })
  @IsJSON()
  @Field(() => GraphQLJSONObject)
  simCardSnapshot!: JsonValue;
}
export { SimCardSnapshotCreateInput };
