import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type CompanyWhereInput = {
  id?: StringFilter;
  logo?: StringNullableFilter;
  name?: StringNullableFilter;
  numberPrefix?: StringNullableFilter;
};
