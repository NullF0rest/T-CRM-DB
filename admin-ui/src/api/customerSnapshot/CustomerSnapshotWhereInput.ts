import { JsonNullableFilter } from "../../util/JsonNullableFilter";
import { Customer } from "../customer/Customer";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";

export type CustomerSnapshotWhereInput = {
  Customer?: JsonNullableFilter;
  customerId?: CustomerWhereUniqueInput;
  id?: StringFilter;
};
