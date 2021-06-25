import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  DateInput,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";

import { CompanyTitle } from "../company/CompanyTitle";
import { CustomerTitle } from "../customer/CustomerTitle";
import { PackageTitle } from "../package/PackageTitle";

export const SimCardCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <DateInput label="Activation Day" source="activationDay" />
        <ReferenceInput source="company.id" reference="Company" label="Company">
          <SelectInput optionText={CompanyTitle} />
        </ReferenceInput>
        <TextInput label="Company ID" source="c_id" />
        <ReferenceInput
          source="customer.id"
          reference="Customer"
          label="Customer"
        >
          <SelectInput optionText={CustomerTitle} />
        </ReferenceInput>
        <TextInput label="Number" source="number" />
        <ReferenceInput
          source="package.id"
          reference="Package"
          label="Packages"
        >
          <SelectInput optionText={PackageTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
