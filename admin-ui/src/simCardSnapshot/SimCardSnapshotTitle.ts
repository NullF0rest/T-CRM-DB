import { SimCardSnapshot as TSimCardSnapshot } from "../api/simCardSnapshot/SimCardSnapshot";

export const SIMCARDSNAPSHOT_TITLE_FIELD = "id";

export const SimCardSnapshotTitle = (record: TSimCardSnapshot) => {
  return record.id;
};
