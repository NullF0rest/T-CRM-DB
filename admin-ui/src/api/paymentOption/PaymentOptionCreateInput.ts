import { InvoiceWhereUniqueInput } from "../invoice/InvoiceWhereUniqueInput";

export type PaymentOptionCreateInput = {
  cardNumber?: number | null;
  invoice?: InvoiceWhereUniqueInput | null;
};
