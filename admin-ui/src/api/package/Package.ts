import { Company } from "../company/Company";
import { SimCard } from "../simCard/SimCard";

export type Package = {
  company?: Company | null;
  createdAt: Date;
  description: string | null;
  id: string;
  name: string;
  price: number | null;
  simCards?: Array<SimCard>;
  updatedAt: Date;
};
