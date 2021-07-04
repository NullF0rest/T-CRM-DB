import { IntNullableFilter } from "../../util/IntNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type PaymentOptionWhereInput = {
  cardNumber?: IntNullableFilter;
  id?: StringFilter;
};
