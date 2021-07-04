import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { BalanceAccountTitle } from "../balanceAccount/BalanceAccountTitle";
import { CustomerTitle } from "../customer/CustomerTitle";

export const PaymentLedgerCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput
          source="balanceaccount.id"
          reference="BalanceAccount"
          label="BalanceAccounts"
        >
          <SelectInput optionText={BalanceAccountTitle} />
        </ReferenceInput>
        <ReferenceInput
          source="customer.id"
          reference="Customer"
          label="Customer"
        >
          <SelectInput optionText={CustomerTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
