import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  NumberInput,
  ReferenceInput,
  SelectInput,
  TextInput,
  DateTimeInput,
} from "react-admin";

import { BalanceAccountTitle } from "../balanceAccount/BalanceAccountTitle";

export const TransactionEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput label="Amount" source="amount" />
        <ReferenceInput
          source="balanceaccount.id"
          reference="BalanceAccount"
          label="BalanceAccounts"
        >
          <SelectInput optionText={BalanceAccountTitle} />
        </ReferenceInput>
        <TextInput label="Method" source="method" />
        <TextInput label="Name" source="name" />
        <TextInput label="Notes" multiline source="notes" />
        <DateTimeInput label="Time" source="Time" />
        <SelectInput
          source="type"
          label="Type"
          choices={[
            { label: "Credit", value: "Credit" },
            { label: "Debit", value: "Debit" },
          ]}
          optionText="label"
          allowEmpty
          optionValue="value"
        />
      </SimpleForm>
    </Edit>
  );
};
