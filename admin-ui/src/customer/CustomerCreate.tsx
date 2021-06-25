import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
  DateInput,
  TextInput,
  BooleanInput,
} from "react-admin";

import { AddressTitle } from "../address/AddressTitle";
import { BalanceAccountTitle } from "../balanceAccount/BalanceAccountTitle";
import { SubscriptionTitle } from "../subscription/SubscriptionTitle";

export const CustomerCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="address.id" reference="Address" label="Address">
          <SelectInput optionText={AddressTitle} />
        </ReferenceInput>
        <ReferenceInput
          source="balanceaccount.id"
          reference="BalanceAccount"
          label="BalanceAccount"
        >
          <SelectInput optionText={BalanceAccountTitle} />
        </ReferenceInput>
        <DateInput label="Date of birth" source="dateOfBirth" />
        <TextInput label="Email" source="email" type="email" />
        <TextInput label="Full Name" source="fullName" />
        <BooleanInput label="Is Active" source="isActive" />
        <BooleanInput label="Is Deleted" source="isDeleted" />
        <TextInput label="National ID" source="nationalId" />
        <TextInput label="Notes" multiline source="notes" />
        <TextInput label="Phone Number" source="phoneNumber" />
        <SelectInput
          source="status"
          label="Status"
          choices={[
            { label: "Holiday", value: "Holiday" },
            { label: "Retired", value: "Retired" },
            { label: "Working", value: "Working" },
            { label: "OutOfCompany", value: "OutOfCompany" },
          ]}
          optionText="label"
          allowEmpty
          optionValue="value"
        />
        <ReferenceInput
          source="subscription.id"
          reference="Subscription"
          label="Subscriptions"
        >
          <SelectInput optionText={SubscriptionTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
