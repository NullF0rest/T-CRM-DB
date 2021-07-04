import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CustomerTitle } from "../customer/CustomerTitle";
import { PaymentLedgerTitle } from "../paymentLedger/PaymentLedgerTitle";
import { SubscriptionTitle } from "../subscription/SubscriptionTitle";

export const BalanceAccountEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput label="Balance" source="balance" />
        <ReferenceInput
          source="customer.id"
          reference="Customer"
          label="Customer"
        >
          <SelectInput optionText={CustomerTitle} />
        </ReferenceInput>
        <ReferenceInput
          source="paymentledger.id"
          reference="PaymentLedger"
          label="PaymentLedger"
        >
          <SelectInput optionText={PaymentLedgerTitle} />
        </ReferenceInput>
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
