import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";

export type BalanceAccountUpdateInput = {
  balance?: number | null;
  customer?: CustomerWhereUniqueInput;
};
