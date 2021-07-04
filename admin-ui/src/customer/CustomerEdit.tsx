import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
  DateInput,
  TextInput,
  BooleanInput,
} from "react-admin";

import { AddressTitle } from "../address/AddressTitle";
import { BalanceAccountTitle } from "../balanceAccount/BalanceAccountTitle";
import { PaymentLedgerTitle } from "../paymentLedger/PaymentLedgerTitle";
import { SubscriptionTitle } from "../subscription/SubscriptionTitle";

export const CustomerEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
        <ReferenceInput
          source="paymentledger.id"
          reference="PaymentLedger"
          label="PaymentLedgers"
        >
          <SelectInput optionText={PaymentLedgerTitle} />
        </ReferenceInput>
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
    </Edit>
  );
};
