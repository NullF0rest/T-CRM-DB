import { BalanceAccount } from "../balanceAccount/BalanceAccount";

export type Transaction = {
  amount: number | null;
  balanceAccount?: BalanceAccount | null;
  createdAt: Date;
  id: string;
  method: string | null;
  name: string | null;
  notes: string | null;
  Time: Date;
  type?: "Credit" | "Debit" | null;
  updatedAt: Date;
};
