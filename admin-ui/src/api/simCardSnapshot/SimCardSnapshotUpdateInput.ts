import { SimCardWhereUniqueInput } from "../simCard/SimCardWhereUniqueInput";
import { JsonValue } from "type-fest";

export type SimCardSnapshotUpdateInput = {
  simCard?: SimCardWhereUniqueInput | null;
  simCardSnapshot?: JsonValue;
};
