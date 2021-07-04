import { SortOrder } from "../../util/SortOrder";

export type TransactionOrderByInput = {
  amount?: SortOrder;
  balanceAccountId?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  invoicesId?: SortOrder;
  method?: SortOrder;
  name?: SortOrder;
  notes?: SortOrder;
  paymentLedgerId?: SortOrder;
  Time?: SortOrder;
  type?: SortOrder;
  updatedAt?: SortOrder;
};
