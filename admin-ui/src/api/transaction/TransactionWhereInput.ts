import { FloatNullableFilter } from "../../util/FloatNullableFilter";
import { BalanceAccountWhereUniqueInput } from "../balanceAccount/BalanceAccountWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { DateTimeFilter } from "../../util/DateTimeFilter";

export type TransactionWhereInput = {
  amount?: FloatNullableFilter;
  balanceAccount?: BalanceAccountWhereUniqueInput;
  id?: StringFilter;
  method?: StringNullableFilter;
  name?: StringNullableFilter;
  notes?: StringNullableFilter;
  Time?: DateTimeFilter;
  type?: "Credit" | "Debit";
};
