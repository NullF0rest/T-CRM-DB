import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, ValidateNested } from "class-validator";
import { InvoiceWhereUniqueInput } from "../../invoice/base/InvoiceWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class PaymentOptionUpdateInput {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  cardNumber?: number | null;

  @ApiProperty({
    required: false,
    type: () => InvoiceWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => InvoiceWhereUniqueInput)
  @IsOptional()
  @Field(() => InvoiceWhereUniqueInput, {
    nullable: true,
  })
  invoice?: InvoiceWhereUniqueInput | null;
}
export { PaymentOptionUpdateInput };
