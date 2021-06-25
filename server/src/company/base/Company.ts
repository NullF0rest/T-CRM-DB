import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Package } from "../../package/base/Package";
import { SimCard } from "../../simCard/base/SimCard";
@ObjectType()
class Company {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  logo!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  numberPrefix!: string | null;

  @ApiProperty({
    required: false,
    type: () => [Package],
  })
  @ValidateNested()
  @Type(() => Package)
  @IsOptional()
  packages?: Array<Package>;

  @ApiProperty({
    required: false,
    type: () => [SimCard],
  })
  @ValidateNested()
  @Type(() => SimCard)
  @IsOptional()
  simCards?: Array<SimCard>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Company };
