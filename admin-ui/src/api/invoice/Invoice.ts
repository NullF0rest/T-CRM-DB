import { BalanceAccount } from "../balanceAccount/BalanceAccount";
import { PaymentLedger } from "../paymentLedger/PaymentLedger";
import { Subscription } from "../subscription/Subscription";
import { Transaction } from "../transaction/Transaction";

export type Invoice = {
  balanceAccount?: BalanceAccount | null;
  createdAt: Date;
  id: string;
  paymentLedger?: PaymentLedger | null;
  subscriptions?: Subscription;
  transaction?: Transaction;
  updatedAt: Date;
};
