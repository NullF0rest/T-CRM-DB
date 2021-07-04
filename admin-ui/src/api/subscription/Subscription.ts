import { Customer } from "../customer/Customer";
import { Invoice } from "../invoice/Invoice";
import { PaymentLedger } from "../paymentLedger/PaymentLedger";

export type Subscription = {
  createdAt: Date;
  customer?: Customer;
  id: string;
  invoice?: Invoice | null;
  paymentLedger?: PaymentLedger | null;
  updatedAt: Date;
};
