import { IntNullableFilter } from "../../util/IntNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { InvoiceWhereUniqueInput } from "../invoice/InvoiceWhereUniqueInput";

export type PaymentOptionWhereInput = {
  cardNumber?: IntNullableFilter;
  id?: StringFilter;
  invoice?: InvoiceWhereUniqueInput;
};
