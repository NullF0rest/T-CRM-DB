import { Address } from "../address/Address";
import { BalanceAccount } from "../balanceAccount/BalanceAccount";
import { SimCard } from "../simCard/SimCard";
import { CustomerSnapshot } from "../customerSnapshot/CustomerSnapshot";
import { Subscription } from "../subscription/Subscription";

export type Customer = {
  address?: Address;
  balanceAccount?: BalanceAccount | null;
  createdAt: Date;
  dateOfBirth: Date | null;
  email: string | null;
  fullName: string;
  id: string;
  isActive: boolean;
  isDeleted: boolean | null;
  nationalId: string | null;
  notes: string | null;
  phoneNumber: string | null;
  simCards?: Array<SimCard>;
  snapshots?: Array<CustomerSnapshot>;
  status?: "Holiday" | "Retired" | "Working" | "OutOfCompany" | null;
  subscriptions?: Subscription | null;
  updatedAt: Date;
};
