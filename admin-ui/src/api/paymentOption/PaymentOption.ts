import { Invoice } from "../invoice/Invoice";
import { PaymentLedger } from "../paymentLedger/PaymentLedger";

export type PaymentOption = {
  cardNumber: number | null;
  createdAt: Date;
  id: string;
  invoice?: Invoice | null;
  paymentLedger?: Array<PaymentLedger>;
  updatedAt: Date;
};
