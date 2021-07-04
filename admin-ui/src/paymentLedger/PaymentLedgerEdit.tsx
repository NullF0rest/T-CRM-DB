import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { BalanceAccountTitle } from "../balanceAccount/BalanceAccountTitle";
import { CustomerTitle } from "../customer/CustomerTitle";

export const PaymentLedgerEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
