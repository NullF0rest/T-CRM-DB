import { Customer } from "../customer/Customer";
import { Invoice } from "../invoice/Invoice";
import { PaymentLedger } from "../paymentLedger/PaymentLedger";
import { Transaction } from "../transaction/Transaction";

export type BalanceAccount = {
  balance: number;
  createdAt: Date;
  customer?: Customer;
  id: string;
  invoices?: Array<Invoice>;
  paymentLedger?: PaymentLedger | null;
  transactions?: Array<Transaction>;
  updatedAt: Date;
};
