import { SortOrder } from "../../util/SortOrder";

export type TransactionOrderByInput = {
  amount?: SortOrder;
  balanceAccountId?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  method?: SortOrder;
  name?: SortOrder;
  notes?: SortOrder;
  Time?: SortOrder;
  type?: SortOrder;
  updatedAt?: SortOrder;
};
