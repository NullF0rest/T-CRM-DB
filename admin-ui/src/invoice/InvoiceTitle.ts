import { Invoice as TInvoice } from "../api/invoice/Invoice";

export const INVOICE_TITLE_FIELD = "id";

export const InvoiceTitle = (record: TInvoice) => {
  return record.id;
};
