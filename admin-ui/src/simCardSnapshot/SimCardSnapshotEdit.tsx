import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { SimCardTitle } from "../simCard/SimCardTitle";

export const SimCardSnapshotEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput
          source="simcard.id"
          reference="SimCard"
          label="SimCardId"
        >
          <SelectInput optionText={SimCardTitle} />
        </ReferenceInput>
        <div />
      </SimpleForm>
    </Edit>
  );
};
