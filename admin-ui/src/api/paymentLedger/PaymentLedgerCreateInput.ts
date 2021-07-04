import { BalanceAccountWhereUniqueInput } from "../balanceAccount/BalanceAccountWhereUniqueInput";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";

export type PaymentLedgerCreateInput = {
  balanceAccounts: BalanceAccountWhereUniqueInput;
  customer?: CustomerWhereUniqueInput;
};
