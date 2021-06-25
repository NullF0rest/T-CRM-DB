import { CustomerSnapshot as TCustomerSnapshot } from "../api/customerSnapshot/CustomerSnapshot";

export const CUSTOMERSNAPSHOT_TITLE_FIELD = "id";

export const CustomerSnapshotTitle = (record: TCustomerSnapshot) => {
  return record.id;
};
