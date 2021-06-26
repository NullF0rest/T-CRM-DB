import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import { SIMCARD_TITLE_FIELD } from "../simCard/SimCardTitle";

export const SimCardSnapshotShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <ReferenceField label="SimCard" source="simcard.id" reference="SimCard">
          <TextField source={SIMCARD_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="SimCardSnapshot" source="simCardSnapshot" />
        <DateField source="updatedAt" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
