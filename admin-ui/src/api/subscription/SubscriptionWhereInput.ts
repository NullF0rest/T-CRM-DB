import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";

export type SubscriptionWhereInput = {
  customer?: CustomerWhereUniqueInput;
  id?: StringFilter;
};
