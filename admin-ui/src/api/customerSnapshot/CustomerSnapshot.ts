import { JsonValue } from "type-fest";
import { Customer } from "../customer/Customer";

export type CustomerSnapshot = {
  createdAt: Date;
  Customer: JsonValue;
  customerId?: Customer | null;
  id: string;
  updatedAt: Date;
};
