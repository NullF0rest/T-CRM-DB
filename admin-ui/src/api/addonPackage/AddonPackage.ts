import { SimCard } from "../simCard/SimCard";

export type AddonPackage = {
  createdAt: Date;
  description: string | null;
  id: string;
  name: string;
  price: number;
  simCard?: Array<SimCard>;
  updatedAt: Date;
};
