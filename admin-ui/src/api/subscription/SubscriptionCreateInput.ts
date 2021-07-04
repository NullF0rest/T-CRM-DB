import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { InvoiceWhereUniqueInput } from "../invoice/InvoiceWhereUniqueInput";
import { PaymentLedgerWhereUniqueInput } from "../paymentLedger/PaymentLedgerWhereUniqueInput";

export type SubscriptionCreateInput = {
  customer?: CustomerWhereUniqueInput;
  invoice?: InvoiceWhereUniqueInput | null;
  paymentLedger?: PaymentLedgerWhereUniqueInput | null;
};
