import { BalanceAccount } from "../balanceAccount/BalanceAccount";
import { Invoice } from "../invoice/Invoice";
import { PaymentLedger } from "../paymentLedger/PaymentLedger";

export type Transaction = {
  amount: number | null;
  balanceAccount?: BalanceAccount;
  createdAt: Date;
  id: string;
  invoices?: Invoice | null;
  method: string | null;
  name: string | null;
  notes: string | null;
  paymentLedger?: PaymentLedger | null;
  Time: Date;
  type?: "Credit" | "Debit" | null;
  updatedAt: Date;
};
