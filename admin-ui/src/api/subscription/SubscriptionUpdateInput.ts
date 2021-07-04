import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { InvoiceWhereUniqueInput } from "../invoice/InvoiceWhereUniqueInput";
import { PaymentLedgerWhereUniqueInput } from "../paymentLedger/PaymentLedgerWhereUniqueInput";

export type SubscriptionUpdateInput = {
  customer?: CustomerWhereUniqueInput;
  invoice?: InvoiceWhereUniqueInput | null;
  paymentLedger?: PaymentLedgerWhereUniqueInput | null;
};
