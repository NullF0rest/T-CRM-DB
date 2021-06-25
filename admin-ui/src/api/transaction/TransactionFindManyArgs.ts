import { TransactionWhereInput } from "./TransactionWhereInput";
import { TransactionOrderByInput } from "./TransactionOrderByInput";

export type TransactionFindManyArgs = {
  where?: TransactionWhereInput;
  orderBy?: TransactionOrderByInput;
  skip?: number;
  take?: number;
};
