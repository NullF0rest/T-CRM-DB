import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CustomerTitle } from "../customer/CustomerTitle";
import { InvoiceTitle } from "../invoice/InvoiceTitle";
import { PaymentLedgerTitle } from "../paymentLedger/PaymentLedgerTitle";

export const SubscriptionCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput
          source="customer.id"
          reference="Customer"
          label="Customer"
        >
          <SelectInput optionText={CustomerTitle} />
        </ReferenceInput>
        <ReferenceInput
          source="invoice.id"
          reference="Invoice"
          label="Invoices"
        >
          <SelectInput optionText={InvoiceTitle} />
        </ReferenceInput>
        <ReferenceInput
          source="paymentledger.id"
          reference="PaymentLedger"
          label="PaymentLedger"
        >
          <SelectInput optionText={PaymentLedgerTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
