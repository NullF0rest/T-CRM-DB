import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { BalanceAccountTitle } from "../balanceAccount/BalanceAccountTitle";
import { PaymentLedgerTitle } from "../paymentLedger/PaymentLedgerTitle";
import { SubscriptionTitle } from "../subscription/SubscriptionTitle";
import { TransactionTitle } from "../transaction/TransactionTitle";

export const InvoiceCreate = (props: CreateProps): React.ReactElement => {
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
    </Create>
  );
};
