import { AddressWhereUniqueInput } from "../address/AddressWhereUniqueInput";
import { BalanceAccountWhereUniqueInput } from "../balanceAccount/BalanceAccountWhereUniqueInput";
import { SubscriptionWhereUniqueInput } from "../subscription/SubscriptionWhereUniqueInput";

export type CustomerCreateInput = {
  address?: AddressWhereUniqueInput;
  balanceAccount?: BalanceAccountWhereUniqueInput | null;
  dateOfBirth?: Date | null;
  email?: string | null;
  fullName: string;
  isActive: boolean;
  isDeleted?: boolean | null;
  nationalId?: string | null;
  notes?: string | null;
  phoneNumber?: string | null;
  status?: "Holiday" | "Retired" | "Working" | "OutOfCompany" | null;
  subscriptions?: SubscriptionWhereUniqueInput | null;
};
