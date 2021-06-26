import { SimCardWhereUniqueInput } from "../simCard/SimCardWhereUniqueInput";
import { JsonValue } from "type-fest";

export type SimCardSnapshotCreateInput = {
  simCard?: SimCardWhereUniqueInput | null;
  simCardSnapshot: JsonValue;
};
