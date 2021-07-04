import { SortOrder } from "../../util/SortOrder";

export type PaymentLedgerOrderByInput = {
  balanceAccountsId?: SortOrder;
  createdAt?: SortOrder;
  customerId?: SortOrder;
  id?: SortOrder;
  updatedAt?: SortOrder;
};
