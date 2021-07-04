import { PaymentLedger as TPaymentLedger } from "../api/paymentLedger/PaymentLedger";

export const PAYMENTLEDGER_TITLE_FIELD = "id";

export const PaymentLedgerTitle = (record: TPaymentLedger) => {
  return record.id;
};
