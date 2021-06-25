import { SortOrder } from "../../util/SortOrder";

export type CustomerOrderByInput = {
  addressId?: SortOrder;
  balanceAccountId?: SortOrder;
  createdAt?: SortOrder;
  dateOfBirth?: SortOrder;
  email?: SortOrder;
  fullName?: SortOrder;
  id?: SortOrder;
  isActive?: SortOrder;
  isDeleted?: SortOrder;
  nationalId?: SortOrder;
  notes?: SortOrder;
  phoneNumber?: SortOrder;
  status?: SortOrder;
  subscriptionsId?: SortOrder;
  updatedAt?: SortOrder;
};
