import { PaymentLedgerWhereInput } from "./PaymentLedgerWhereInput";
import { PaymentLedgerOrderByInput } from "./PaymentLedgerOrderByInput";

export type PaymentLedgerFindManyArgs = {
  where?: PaymentLedgerWhereInput;
  orderBy?: PaymentLedgerOrderByInput;
  skip?: number;
  take?: number;
};
