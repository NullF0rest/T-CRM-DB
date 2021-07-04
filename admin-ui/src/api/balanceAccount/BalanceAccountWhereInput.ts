import { FloatFilter } from "../../util/FloatFilter";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { PaymentLedgerWhereUniqueInput } from "../paymentLedger/PaymentLedgerWhereUniqueInput";
import { SubscriptionWhereUniqueInput } from "../subscription/SubscriptionWhereUniqueInput";

export type BalanceAccountWhereInput = {
  balance?: FloatFilter;
  customer?: CustomerWhereUniqueInput;
  id?: StringFilter;
  paymentLedger?: PaymentLedgerWhereUniqueInput;
  subscription?: SubscriptionWhereUniqueInput;
};
