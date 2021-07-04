import { AddonPackage } from "../addonPackage/AddonPackage";
import { Company } from "../company/Company";
import { Customer } from "../customer/Customer";
import { Package } from "../package/Package";
import { SimCardSnapshot } from "../simCardSnapshot/SimCardSnapshot";

export type SimCard = {
  activationDay: Date | null;
  addonPackages?: Array<AddonPackage>;
  company?: Company;
  c_id: string | null;
  createdAt: Date;
  customer?: Customer | null;
  id: string;
  number: string;
  package?: Package | null;
  snapshot?: Array<SimCardSnapshot>;
  updatedAt: Date;
};
