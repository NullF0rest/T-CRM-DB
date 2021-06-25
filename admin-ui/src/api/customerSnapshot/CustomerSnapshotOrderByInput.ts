import { SortOrder } from "../../util/SortOrder";
import { Customer } from "../customer/Customer";

export type CustomerSnapshotOrderByInput = {
  createdAt?: SortOrder;
  Customer?: SortOrder;
  customerIdId?: SortOrder;
  id?: SortOrder;
  updatedAt?: SortOrder;
};
