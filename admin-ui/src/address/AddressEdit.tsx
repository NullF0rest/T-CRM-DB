import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CustomerTitle } from "../customer/CustomerTitle";

export const AddressEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
