import { BalanceAccount } from "../balanceAccount/BalanceAccount";
import { Customer } from "../customer/Customer";
import { Invoice } from "../invoice/Invoice";
import { PaymentOption } from "../paymentOption/PaymentOption";
import { Subscription } from "../subscription/Subscription";
import { Transaction } from "../transaction/Transaction";

export type PaymentLedger = {
  balanceAccounts?: BalanceAccount;
  createdAt: Date;
  customer?: Customer;
  id: string;
  invoices?: Array<Invoice>;
  paymentOptions?: Array<PaymentOption>;
  subscriptions?: Array<Subscription>;
  transactions?: Array<Transaction>;
  updatedAt: Date;
};
