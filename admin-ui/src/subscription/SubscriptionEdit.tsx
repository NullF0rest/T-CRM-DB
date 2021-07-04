import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CustomerTitle } from "../customer/CustomerTitle";
import { InvoiceTitle } from "../invoice/InvoiceTitle";
import { PaymentLedgerTitle } from "../paymentLedger/PaymentLedgerTitle";

export const SubscriptionEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
