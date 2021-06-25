import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CustomerTitle } from "../customer/CustomerTitle";

export const AddressCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Address_1" source="address_1" />
        <TextInput label="Address_2" source="address_2" />
        <TextInput label="City" source="city" />
        <ReferenceInput
          source="customer.id"
          reference="Customer"
          label="Customer"
        >
          <SelectInput optionText={CustomerTitle} />
        </ReferenceInput>
        <TextInput label="Geolocation" source="geolocation" />
        <TextInput label="Governate" source="governate" />
        <TextInput label="Zipcode" source="zipcode" />
      </SimpleForm>
    </Create>
  );
};
