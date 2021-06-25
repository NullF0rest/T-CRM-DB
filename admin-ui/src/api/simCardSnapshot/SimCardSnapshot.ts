import { SimCard } from "../simCard/SimCard";
import { JsonValue } from "type-fest";

export type SimCardSnapshot = {
  createdAt: Date;
  id: string;
  simCardId?: SimCard | null;
  simCardSnapshot: JsonValue;
  updatedAt: Date;
};
