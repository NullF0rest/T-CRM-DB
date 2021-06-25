import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";

export type AddressCreateInput = {
  address_1?: string | null;
  address_2?: string | null;
  city?: string | null;
  customer?: CustomerWhereUniqueInput | null;
  geolocation?: string | null;
  governate?: string | null;
  zipcode?: string | null;
};
