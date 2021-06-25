import { Company as TCompany } from "../api/company/Company";

export const COMPANY_TITLE_FIELD = "name";

export const CompanyTitle = (record: TCompany) => {
  return record.name;
};
