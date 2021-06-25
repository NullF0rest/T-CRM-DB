import { SortOrder } from "../../util/SortOrder";

export type CompanyOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  logo?: SortOrder;
  name?: SortOrder;
  numberPrefix?: SortOrder;
  updatedAt?: SortOrder;
};
