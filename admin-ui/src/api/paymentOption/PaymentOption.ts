import { PaymentLedger } from "../paymentLedger/PaymentLedger";

export type PaymentOption = {
  cardNumber: number | null;
  createdAt: Date;
  id: string;
  paymentLedger?: Array<PaymentLedger>;
  updatedAt: Date;
};
