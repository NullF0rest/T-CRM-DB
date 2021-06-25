import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { CompanyWhereUniqueInput } from "../company/CompanyWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { PackageWhereUniqueInput } from "../package/PackageWhereUniqueInput";

export type SimCardWhereInput = {
  activationDay?: DateTimeNullableFilter;
  company?: CompanyWhereUniqueInput;
  c_id?: StringNullableFilter;
  customer?: CustomerWhereUniqueInput;
  id?: StringFilter;
  number?: StringFilter;
  package?: PackageWhereUniqueInput;
};
