import { SimCardWhereUniqueInput } from "../simCard/SimCardWhereUniqueInput";
import { JsonValue } from "type-fest";

export type SimCardSnapshotUpdateInput = {
  simCardId?: SimCardWhereUniqueInput | null;
  simCardSnapshot?: JsonValue;
};
