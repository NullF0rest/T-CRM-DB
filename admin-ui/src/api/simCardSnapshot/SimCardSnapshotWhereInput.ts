import { StringFilter } from "../../util/StringFilter";
import { SimCardWhereUniqueInput } from "../simCard/SimCardWhereUniqueInput";
import { JsonNullableFilter } from "../../util/JsonNullableFilter";

export type SimCardSnapshotWhereInput = {
  id?: StringFilter;
  simCardId?: SimCardWhereUniqueInput;
  simCardSnapshot?: JsonNullableFilter;
};
