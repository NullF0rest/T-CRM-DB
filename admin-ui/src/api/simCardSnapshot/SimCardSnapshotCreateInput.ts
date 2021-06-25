import { SimCardWhereUniqueInput } from "../simCard/SimCardWhereUniqueInput";
import { JsonValue } from "type-fest";

export type SimCardSnapshotCreateInput = {
  simCardId?: SimCardWhereUniqueInput | null;
  simCardSnapshot: JsonValue;
};
