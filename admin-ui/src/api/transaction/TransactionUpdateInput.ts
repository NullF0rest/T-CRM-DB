import { BalanceAccountWhereUniqueInput } from "../balanceAccount/BalanceAccountWhereUniqueInput";

export type TransactionUpdateInput = {
  amount?: number | null;
  balanceAccount?: BalanceAccountWhereUniqueInput | null;
  method?: string | null;
  name?: string | null;
  notes?: string | null;
  Time?: Date;
  type?: "Credit" | "Debit" | null;
};
