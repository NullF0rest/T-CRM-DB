import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  ReferenceField,
  TextField,
  DateField,
  ReferenceManyField,
  Datagrid,
} from "react-admin";

import { INVOICE_TITLE_FIELD } from "./InvoiceTitle";
import { BALANCEACCOUNT_TITLE_FIELD } from "../balanceAccount/BalanceAccountTitle";
import { PAYMENTLEDGER_TITLE_FIELD } from "../paymentLedger/PaymentLedgerTitle";
import { SUBSCRIPTION_TITLE_FIELD } from "../subscription/SubscriptionTitle";
import { TRANSACTION_TITLE_FIELD } from "../transaction/TransactionTitle";

export const InvoiceShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <ReferenceField
          label="BalanceAccounts"
          source="balanceaccount.id"
          reference="BalanceAccount"
        >
          <TextField source={BALANCEACCOUNT_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <ReferenceField
          label="PaymentLedger"
          source="paymentledger.id"
          reference="PaymentLedger"
        >
          <TextField source={PAYMENTLEDGER_TITLE_FIELD} />
        </ReferenceField>
        <ReferenceField
          label="Subscriptions"
          source="subscription.id"
          reference="Subscription"
        >
          <TextField source={SUBSCRIPTION_TITLE_FIELD} />
        </ReferenceField>
        <ReferenceField
          label="Transaction"
          source="transaction.id"
          reference="Transaction"
        >
          <TextField source={TRANSACTION_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField
          reference="PaymentOption"
          target="InvoiceId"
          label="PaymentOptions"
        >
          <Datagrid rowClick="show">
            <TextField label="CardNumber" source="cardNumber" />
            <DateField source="createdAt" label="Created At" />
            <TextField label="ID" source="id" />
            <ReferenceField
              label="Invoices"
              source="invoice.id"
              reference="Invoice"
            >
              <TextField source={INVOICE_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};