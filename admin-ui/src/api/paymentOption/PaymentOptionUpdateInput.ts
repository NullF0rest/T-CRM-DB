import { InvoiceWhereUniqueInput } from "../invoice/InvoiceWhereUniqueInput";

export type PaymentOptionUpdateInput = {
  cardNumber?: number | null;
  invoice?: InvoiceWhereUniqueInput | null;
};
