import { CompanyWhereUniqueInput } from "../company/CompanyWhereUniqueInput";

export type PackageUpdateInput = {
  company?: CompanyWhereUniqueInput | null;
  description?: string | null;
  name?: string;
  price?: number | null;
};
