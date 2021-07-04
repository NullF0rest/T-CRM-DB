import { FloatFilter } from "../../util/FloatFilter";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { PaymentLedgerWhereUniqueInput } from "../paymentLedger/PaymentLedgerWhereUniqueInput";

export type BalanceAccountWhereInput = {
  balance?: FloatFilter;
  customer?: CustomerWhereUniqueInput;
  id?: StringFilter;
  paymentLedger?: PaymentLedgerWhereUniqueInput;
};
