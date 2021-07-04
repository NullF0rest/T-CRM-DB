import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  ReferenceField,
  TextField,
} from "react-admin";
import { CUSTOMER_TITLE_FIELD } from "../customer/CustomerTitle";
import { INVOICE_TITLE_FIELD } from "../invoice/InvoiceTitle";
import { PAYMENTLEDGER_TITLE_FIELD } from "../paymentLedger/PaymentLedgerTitle";

export const SubscriptionShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
      </SimpleShowLayout>
    </Show>
  );
};
