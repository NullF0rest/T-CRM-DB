import { Package } from "../package/Package";
import { SimCard } from "../simCard/SimCard";

export type Company = {
  createdAt: Date;
  id: string;
  logo: string | null;
  name: string | null;
  numberPrefix: string | null;
  packages?: Array<Package>;
  simCards?: Array<SimCard>;
  updatedAt: Date;
};
