import { StringNullableFilter } from "../../util/StringNullableFilter";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";

export type AddressWhereInput = {
  address_1?: StringNullableFilter;
  address_2?: StringNullableFilter;
  city?: StringNullableFilter;
  customer?: CustomerWhereUniqueInput;
  geolocation?: StringNullableFilter;
  governate?: StringNullableFilter;
  id?: StringFilter;
  zipcode?: StringNullableFilter;
};
