import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { BalanceAccountTitle } from "../balanceAccount/BalanceAccountTitle";
import { PaymentLedgerTitle } from "../paymentLedger/PaymentLedgerTitle";
import { SubscriptionTitle } from "../subscription/SubscriptionTitle";
import { TransactionTitle } from "../transaction/TransactionTitle";

export const InvoiceEdit = (props: EditProps): React.ReactElement => {
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
        <ReferenceInput
          source="transaction.id"
          reference="Transaction"
          label="Transaction"
        >
          <SelectInput optionText={TransactionTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};
