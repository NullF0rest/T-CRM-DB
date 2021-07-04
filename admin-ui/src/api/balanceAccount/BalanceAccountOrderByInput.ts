import { SortOrder } from "../../util/SortOrder";

export type BalanceAccountOrderByInput = {
  balance?: SortOrder;
  createdAt?: SortOrder;
  customerId?: SortOrder;
  id?: SortOrder;
  paymentLedgerId?: SortOrder;
  updatedAt?: SortOrder;
};
