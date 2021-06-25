import { registerEnumType } from "@nestjs/graphql";

export enum EnumTransactionType {
  Credit = "Credit",
  Debit = "Debit",
}

registerEnumType(EnumTransactionType, {
  name: "EnumTransactionType",
});
