import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  ReferenceField,
  DateField,
  ReferenceManyField,
  Datagrid,
} from "react-admin";

import { SIMCARD_TITLE_FIELD } from "./SimCardTitle";
import { COMPANY_TITLE_FIELD } from "../company/CompanyTitle";
import { CUSTOMER_TITLE_FIELD } from "../customer/CustomerTitle";
import { PACKAGE_TITLE_FIELD } from "../package/PackageTitle";

export const SimCardShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="Activation Day" source="activationDay" />
        <ReferenceField label="Company" source="company.id" reference="Company">
          <TextField source={COMPANY_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Company ID" source="c_id" />
        <DateField source="createdAt" label="Created At" />
        <ReferenceField
          label="Customer"
          source="customer.id"
          reference="Customer"
        >
          <TextField source={CUSTOMER_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="ID" source="id" />
        <TextField label="Number" source="number" />
        <ReferenceField
          label="Packages"
          source="package.id"
          reference="Package"
        >
          <TextField source={PACKAGE_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField
          reference="SimCardSnapshot"
          target="SimCardId"
          label="SimCardSnapshots"
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
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
