import { AddressWhereUniqueInput } from "../address/AddressWhereUniqueInput";
import { BalanceAccountWhereUniqueInput } from "../balanceAccount/BalanceAccountWhereUniqueInput";
import { PaymentLedgerWhereUniqueInput } from "../paymentLedger/PaymentLedgerWhereUniqueInput";
import { SubscriptionWhereUniqueInput } from "../subscription/SubscriptionWhereUniqueInput";

export type CustomerCreateInput = {
  address?: AddressWhereUniqueInput;
  balanceAccount: BalanceAccountWhereUniqueInput;
  dateOfBirth?: Date | null;
  email?: string | null;
  fullName: string;
  isActive: boolean;
  isDeleted?: boolean | null;
  nationalId?: string | null;
  notes?: string | null;
  paymentLedgers?: PaymentLedgerWhereUniqueInput | null;
  phoneNumber?: string | null;
  status?: "Holiday" | "Retired" | "Working" | "OutOfCompany" | null;
  subscriptions: SubscriptionWhereUniqueInput;
};
