import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";
import { AddonPackage } from "../../addonPackage/base/AddonPackage";
import { Company } from "../../company/base/Company";
import { Customer } from "../../customer/base/Customer";
import { Package } from "../../package/base/Package";
import { SimCardSnapshot } from "../../simCardSnapshot/base/SimCardSnapshot";
@ObjectType()
class SimCard {
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  activationDay!: Date | null;

  @ApiProperty({
    required: false,
    type: () => [AddonPackage],
  })
  @ValidateNested()
  @Type(() => AddonPackage)
  @IsOptional()
  addonPackages?: Array<AddonPackage>;

  @ApiProperty({
    required: true,
    type: () => Company,
  })
  @ValidateNested()
  @Type(() => Company)
  company?: Company;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  c_id!: string | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: false,
    type: () => Customer,
  })
  @ValidateNested()
  @Type(() => Customer)
  @IsOptional()
  customer?: Customer | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  number!: string;

  @ApiProperty({
    required: false,
    type: () => Package,
  })
  @ValidateNested()
  @Type(() => Package)
  @IsOptional()
  package?: Package | null;

  @ApiProperty({
    required: false,
    type: () => [SimCardSnapshot],
  })
  @ValidateNested()
  @Type(() => SimCardSnapshot)
  @IsOptional()
  snapshot?: Array<SimCardSnapshot>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { SimCard };
