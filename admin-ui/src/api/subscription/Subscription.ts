import { Customer } from "../customer/Customer";

export type Subscription = {
  createdAt: Date;
  customer?: Customer;
  id: string;
  updatedAt: Date;
};
