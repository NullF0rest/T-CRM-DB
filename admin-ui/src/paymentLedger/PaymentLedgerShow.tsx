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

import { BALANCEACCOUNT_TITLE_FIELD } from "../balanceAccount/BalanceAccountTitle";
import { PAYMENTLEDGER_TITLE_FIELD } from "./PaymentLedgerTitle";
import { SUBSCRIPTION_TITLE_FIELD } from "../subscription/SubscriptionTitle";
import { TRANSACTION_TITLE_FIELD } from "../transaction/TransactionTitle";
import { CUSTOMER_TITLE_FIELD } from "../customer/CustomerTitle";
import { INVOICE_TITLE_FIELD } from "../invoice/InvoiceTitle";

export const PaymentLedgerShow = (props: ShowProps): React.ReactElement => {
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
        <ReferenceField
          label="Customer"
          source="customer.id"
          reference="Customer"
        >
          <TextField source={CUSTOMER_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="ID" source="id" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField
          reference="Invoice"
          target="PaymentLedgerId"
          label="Invoices"
        >
          <Datagrid rowClick="show">
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
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          reference="Subscription"
          target="PaymentLedgerId"
          label="Subscriptions"
        >
          <Datagrid rowClick="show">
            <DateField source="createdAt" label="Created At" />
            <ReferenceField
              label="Customer"
              source="customer.id"
              reference="Customer"
            >
              <TextField source={CUSTOMER_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="ID" source="id" />
            <ReferenceField
              label="Invoices"
              source="invoice.id"
              reference="Invoice"
            >
              <TextField source={INVOICE_TITLE_FIELD} />
            </ReferenceField>
            <ReferenceField
              label="PaymentLedger"
              source="paymentledger.id"
              reference="PaymentLedger"
            >
              <TextField source={PAYMENTLEDGER_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          reference="Transaction"
          target="PaymentLedgerId"
          label="Transactions"
        >
          <Datagrid rowClick="show">
            <TextField label="Amount" source="amount" />
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
              label="Invoices"
              source="invoice.id"
              reference="Invoice"
            >
              <TextField source={INVOICE_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="Method" source="method" />
            <TextField label="Name" source="name" />
            <TextField label="Notes" source="notes" />
            <ReferenceField
              label="PaymentLedger"
              source="paymentledger.id"
              reference="PaymentLedger"
            >
              <TextField source={PAYMENTLEDGER_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="Time" source="Time" />
            <TextField label="Type" source="type" />
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
