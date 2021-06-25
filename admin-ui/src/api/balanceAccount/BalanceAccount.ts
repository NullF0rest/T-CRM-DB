import { Customer } from "../customer/Customer";
import { Transaction } from "../transaction/Transaction";

export type BalanceAccount = {
  balance: number | null;
  createdAt: Date;
  customer?: Customer;
  id: string;
  transactions?: Array<Transaction>;
  updatedAt: Date;
};
