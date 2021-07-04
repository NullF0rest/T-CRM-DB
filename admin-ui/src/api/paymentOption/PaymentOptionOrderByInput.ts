import { SortOrder } from "../../util/SortOrder";

export type PaymentOptionOrderByInput = {
  cardNumber?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  invoiceId?: SortOrder;
  updatedAt?: SortOrder;
};
