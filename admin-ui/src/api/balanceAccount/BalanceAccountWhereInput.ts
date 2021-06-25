import { FloatNullableFilter } from "../../util/FloatNullableFilter";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";

export type BalanceAccountWhereInput = {
  balance?: FloatNullableFilter;
  customer?: CustomerWhereUniqueInput;
  id?: StringFilter;
};
