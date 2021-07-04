import { BalanceAccountWhereUniqueInput } from "../balanceAccount/BalanceAccountWhereUniqueInput";
import { InvoiceWhereUniqueInput } from "../invoice/InvoiceWhereUniqueInput";
import { PaymentLedgerWhereUniqueInput } from "../paymentLedger/PaymentLedgerWhereUniqueInput";

export type TransactionCreateInput = {
  amount?: number | null;
  balanceAccount: BalanceAccountWhereUniqueInput;
  invoices?: InvoiceWhereUniqueInput | null;
  method?: string | null;
  name?: string | null;
  notes?: string | null;
  paymentLedger?: PaymentLedgerWhereUniqueInput | null;
  Time: Date;
  type?: "Credit" | "Debit" | null;
};
