import { CompanyWhereUniqueInput } from "../company/CompanyWhereUniqueInput";

export type PackageUpdateInput = {
  company?: CompanyWhereUniqueInput;
  description?: string | null;
  name?: string;
  price?: number | null;
};
