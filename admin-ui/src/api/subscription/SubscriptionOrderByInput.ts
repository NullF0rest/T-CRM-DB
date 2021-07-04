import { SortOrder } from "../../util/SortOrder";

export type SubscriptionOrderByInput = {
  createdAt?: SortOrder;
  customerId?: SortOrder;
  id?: SortOrder;
  invoiceId?: SortOrder;
  paymentLedgerId?: SortOrder;
  updatedAt?: SortOrder;
};
