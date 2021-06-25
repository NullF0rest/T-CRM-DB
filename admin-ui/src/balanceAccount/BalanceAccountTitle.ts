import { BalanceAccount as TBalanceAccount } from "../api/balanceAccount/BalanceAccount";

export const BALANCEACCOUNT_TITLE_FIELD = "id";

export const BalanceAccountTitle = (record: TBalanceAccount) => {
  return record.id;
};
