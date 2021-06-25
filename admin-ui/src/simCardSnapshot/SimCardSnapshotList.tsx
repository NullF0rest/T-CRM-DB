import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { SIMCARD_TITLE_FIELD } from "../simCard/SimCardTitle";

export const SimCardSnapshotList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"SimCardSnapshots"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <ReferenceField
          label="SimCardId"
          source="simcard.id"
          reference="SimCard"
        >
          <TextField source={SIMCARD_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="SimCardSnapshot" source="simCardSnapshot" />
        <DateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
  );
};
