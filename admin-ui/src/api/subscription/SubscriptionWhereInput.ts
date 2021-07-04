import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { InvoiceWhereUniqueInput } from "../invoice/InvoiceWhereUniqueInput";
import { PaymentLedgerWhereUniqueInput } from "../paymentLedger/PaymentLedgerWhereUniqueInput";

export type SubscriptionWhereInput = {
  customer?: CustomerWhereUniqueInput;
  id?: StringFilter;
  invoice?: InvoiceWhereUniqueInput;
  paymentLedger?: PaymentLedgerWhereUniqueInput;
};
