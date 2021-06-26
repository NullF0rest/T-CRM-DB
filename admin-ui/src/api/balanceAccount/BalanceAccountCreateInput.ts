import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";

export type BalanceAccountCreateInput = {
  balance?: number | null;
  customer?: CustomerWhereUniqueInput;
};
