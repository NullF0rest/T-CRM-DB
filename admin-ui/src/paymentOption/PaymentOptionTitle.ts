import { PaymentOption as TPaymentOption } from "../api/paymentOption/PaymentOption";

export const PAYMENTOPTION_TITLE_FIELD = "id";

export const PaymentOptionTitle = (record: TPaymentOption) => {
  return record.id;
};
