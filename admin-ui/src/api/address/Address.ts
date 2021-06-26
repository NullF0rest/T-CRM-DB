import { Customer } from "../customer/Customer";

export type Address = {
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  createdAt: Date;
  customer?: Customer;
  geolocation: string | null;
  governate: string | null;
  id: string;
  updatedAt: Date;
  zipcode: string | null;
};
