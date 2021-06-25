import { AddressWhereUniqueInput } from "../address/AddressWhereUniqueInput";
import { BalanceAccountWhereUniqueInput } from "../balanceAccount/BalanceAccountWhereUniqueInput";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { BooleanFilter } from "../../util/BooleanFilter";
import { BooleanNullableFilter } from "../../util/BooleanNullableFilter";
import { SubscriptionWhereUniqueInput } from "../subscription/SubscriptionWhereUniqueInput";

export type CustomerWhereInput = {
  address?: AddressWhereUniqueInput;
  balanceAccount?: BalanceAccountWhereUniqueInput;
  dateOfBirth?: DateTimeNullableFilter;
  email?: StringNullableFilter;
  fullName?: StringFilter;
  id?: StringFilter;
  isActive?: BooleanFilter;
  isDeleted?: BooleanNullableFilter;
  nationalId?: StringNullableFilter;
  notes?: StringNullableFilter;
  phoneNumber?: StringNullableFilter;
  status?: "Holiday" | "Retired" | "Working" | "OutOfCompany";
  subscriptions?: SubscriptionWhereUniqueInput;
};
