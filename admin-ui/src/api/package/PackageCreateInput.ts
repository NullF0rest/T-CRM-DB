import { CompanyWhereUniqueInput } from "../company/CompanyWhereUniqueInput";

export type PackageCreateInput = {
  company?: CompanyWhereUniqueInput | null;
  description?: string | null;
  name: string;
  price?: number | null;
};
