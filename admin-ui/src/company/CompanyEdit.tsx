import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const CompanyEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Logo" source="logo" />
        <TextInput label="Name" source="name" />
        <TextInput label="NumberPrefix" source="numberPrefix" />
      </SimpleForm>
    </Edit>
  );
};
