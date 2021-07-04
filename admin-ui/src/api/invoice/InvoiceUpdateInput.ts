import { BalanceAccountWhereUniqueInput } from "../balanceAccount/BalanceAccountWhereUniqueInput";
import { PaymentLedgerWhereUniqueInput } from "../paymentLedger/PaymentLedgerWhereUniqueInput";
import { SubscriptionWhereUniqueInput } from "../subscription/SubscriptionWhereUniqueInput";
import { TransactionWhereUniqueInput } from "../transaction/TransactionWhereUniqueInput";

export type InvoiceUpdateInput = {
  balanceAccount?: BalanceAccountWhereUniqueInput | null;
  paymentLedger?: PaymentLedgerWhereUniqueInput | null;
  subscriptions?: SubscriptionWhereUniqueInput;
  transaction?: TransactionWhereUniqueInput;
};
