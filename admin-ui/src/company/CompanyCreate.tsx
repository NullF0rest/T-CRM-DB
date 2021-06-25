import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const CompanyCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Logo" source="logo" />
        <TextInput label="Name" source="name" />
        <TextInput label="NumberPrefix" source="numberPrefix" />
      </SimpleForm>
    </Create>
  );
};
