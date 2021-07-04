import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { PaymentLedgerWhereUniqueInput } from "../paymentLedger/PaymentLedgerWhereUniqueInput";

export type BalanceAccountUpdateInput = {
  balance?: number;
  customer?: CustomerWhereUniqueInput;
  paymentLedger?: PaymentLedgerWhereUniqueInput | null;
};
