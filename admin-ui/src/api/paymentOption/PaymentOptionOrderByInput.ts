import { SortOrder } from "../../util/SortOrder";

export type PaymentOptionOrderByInput = {
  cardNumber?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  updatedAt?: SortOrder;
};
