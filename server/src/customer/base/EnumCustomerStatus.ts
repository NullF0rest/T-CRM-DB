import { registerEnumType } from "@nestjs/graphql";

export enum EnumCustomerStatus {
  Holiday = "Holiday",
  Retired = "Retired",
  Working = "Working",
  OutOfCompany = "OutOfCompany",
}

registerEnumType(EnumCustomerStatus, {
  name: "EnumCustomerStatus",
});
