import { CustomerSnapshotWhereInput } from "./CustomerSnapshotWhereInput";
import { CustomerSnapshotOrderByInput } from "./CustomerSnapshotOrderByInput";

export type CustomerSnapshotFindManyArgs = {
  where?: CustomerSnapshotWhereInput;
  orderBy?: CustomerSnapshotOrderByInput;
  skip?: number;
  take?: number;
};
