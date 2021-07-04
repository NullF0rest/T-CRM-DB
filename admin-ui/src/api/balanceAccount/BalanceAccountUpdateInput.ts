import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { PaymentLedgerWhereUniqueInput } from "../paymentLedger/PaymentLedgerWhereUniqueInput";
import { SubscriptionWhereUniqueInput } from "../subscription/SubscriptionWhereUniqueInput";

export type BalanceAccountUpdateInput = {
  balance?: number;
  customer?: CustomerWhereUniqueInput;
  paymentLedger?: PaymentLedgerWhereUniqueInput | null;
  subscription?: SubscriptionWhereUniqueInput | null;
};
