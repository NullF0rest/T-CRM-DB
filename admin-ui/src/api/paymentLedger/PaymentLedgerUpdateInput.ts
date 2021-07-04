import { BalanceAccountWhereUniqueInput } from "../balanceAccount/BalanceAccountWhereUniqueInput";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";

export type PaymentLedgerUpdateInput = {
  balanceAccounts?: BalanceAccountWhereUniqueInput;
  customer?: CustomerWhereUniqueInput;
};
