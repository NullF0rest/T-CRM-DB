import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, ValidateNested, IsOptional } from "class-validator";
import { GraphQLJSONObject } from "graphql-type-json";
import { Customer } from "../../customer/base/Customer";
import { JsonValue } from "type-fest";
import { CustomerWhereUniqueInput } from "../../customer/base/CustomerWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class CustomerSnapshotCreateInput {
  @ApiProperty({
    required: true,
  })
  @IsJSON()
  @Field(() => GraphQLJSONObject)
  Customer!: JsonValue;

  @ApiProperty({
    required: false,
    type: () => CustomerWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CustomerWhereUniqueInput)
  @IsOptional()
  @Field(() => CustomerWhereUniqueInput, {
    nullable: true,
  })
  customerId?: CustomerWhereUniqueInput | null;
}
export { CustomerSnapshotCreateInput };
