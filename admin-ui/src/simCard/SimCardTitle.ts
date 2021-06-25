import { SimCard as TSimCard } from "../api/simCard/SimCard";

export const SIMCARD_TITLE_FIELD = "c_id";

export const SimCardTitle = (record: TSimCard) => {
  return record.c_id;
};
