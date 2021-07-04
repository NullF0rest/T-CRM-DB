import { FloatNullableFilter } from "../../util/FloatNullableFilter";
import { BalanceAccountWhereUniqueInput } from "../balanceAccount/BalanceAccountWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { InvoiceWhereUniqueInput } from "../invoice/InvoiceWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { PaymentLedgerWhereUniqueInput } from "../paymentLedger/PaymentLedgerWhereUniqueInput";
import { DateTimeFilter } from "../../util/DateTimeFilter";

export type TransactionWhereInput = {
  amount?: FloatNullableFilter;
  balanceAccount?: BalanceAccountWhereUniqueInput;
  id?: StringFilter;
  invoices?: InvoiceWhereUniqueInput;
  method?: StringNullableFilter;
  name?: StringNullableFilter;
  notes?: StringNullableFilter;
  paymentLedger?: PaymentLedgerWhereUniqueInput;
  Time?: DateTimeFilter;
  type?: "Credit" | "Debit";
};
