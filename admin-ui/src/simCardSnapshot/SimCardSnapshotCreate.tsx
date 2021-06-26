import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { SimCardTitle } from "../simCard/SimCardTitle";

export const SimCardSnapshotCreate = (
  props: CreateProps
): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="simcard.id" reference="SimCard" label="SimCard">
          <SelectInput optionText={SimCardTitle} />
        </ReferenceInput>
        <div />
      </SimpleForm>
    </Create>
  );
};
