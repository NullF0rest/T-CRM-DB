import { BalanceAccountWhereInput } from "./BalanceAccountWhereInput";
import { BalanceAccountOrderByInput } from "./BalanceAccountOrderByInput";

export type BalanceAccountFindManyArgs = {
  where?: BalanceAccountWhereInput;
  orderBy?: BalanceAccountOrderByInput;
  skip?: number;
  take?: number;
};
