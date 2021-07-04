import { SortOrder } from "../../util/SortOrder";

export type InvoiceOrderByInput = {
  balanceAccountId?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  paymentLedgerId?: SortOrder;
  subscriptionsId?: SortOrder;
  transactionId?: SortOrder;
  updatedAt?: SortOrder;
};
