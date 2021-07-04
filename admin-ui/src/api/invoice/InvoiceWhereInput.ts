import { BalanceAccountWhereUniqueInput } from "../balanceAccount/BalanceAccountWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { PaymentLedgerWhereUniqueInput } from "../paymentLedger/PaymentLedgerWhereUniqueInput";
import { SubscriptionWhereUniqueInput } from "../subscription/SubscriptionWhereUniqueInput";
import { TransactionWhereUniqueInput } from "../transaction/TransactionWhereUniqueInput";

export type InvoiceWhereInput = {
  balanceAccount?: BalanceAccountWhereUniqueInput;
  id?: StringFilter;
  paymentLedger?: PaymentLedgerWhereUniqueInput;
  subscriptions?: SubscriptionWhereUniqueInput;
  transaction?: TransactionWhereUniqueInput;
};
