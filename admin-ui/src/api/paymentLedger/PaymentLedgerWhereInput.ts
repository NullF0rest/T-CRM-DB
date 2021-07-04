import { BalanceAccountWhereUniqueInput } from "../balanceAccount/BalanceAccountWhereUniqueInput";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";

export type PaymentLedgerWhereInput = {
  balanceAccounts?: BalanceAccountWhereUniqueInput;
  customer?: CustomerWhereUniqueInput;
  id?: StringFilter;
};
