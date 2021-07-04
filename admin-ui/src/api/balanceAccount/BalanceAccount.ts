import { Customer } from "../customer/Customer";
import { Invoice } from "../invoice/Invoice";
import { PaymentLedger } from "../paymentLedger/PaymentLedger";
import { Subscription } from "../subscription/Subscription";
import { Transaction } from "../transaction/Transaction";

export type BalanceAccount = {
  balance: number;
  createdAt: Date;
  customer?: Customer;
  id: string;
  invoices?: Array<Invoice>;
  paymentLedger?: PaymentLedger | null;
  subscription?: Subscription | null;
  transactions?: Array<Transaction>;
  updatedAt: Date;
};
