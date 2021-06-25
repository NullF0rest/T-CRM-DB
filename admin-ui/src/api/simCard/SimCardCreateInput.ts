import { CompanyWhereUniqueInput } from "../company/CompanyWhereUniqueInput";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { PackageWhereUniqueInput } from "../package/PackageWhereUniqueInput";

export type SimCardCreateInput = {
  activationDay?: Date | null;
  company?: CompanyWhereUniqueInput | null;
  c_id?: string | null;
  customer: CustomerWhereUniqueInput;
  number: string;
  package?: PackageWhereUniqueInput | null;
};
