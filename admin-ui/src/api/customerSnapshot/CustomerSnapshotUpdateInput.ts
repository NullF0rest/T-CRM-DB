import { JsonValue } from "type-fest";
import { Customer } from "../customer/Customer";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";

export type CustomerSnapshotUpdateInput = {
  Customer?: JsonValue;
  customerId?: CustomerWhereUniqueInput | null;
};
