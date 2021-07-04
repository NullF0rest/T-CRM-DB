import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { InvoiceTitle } from "../invoice/InvoiceTitle";

export const PaymentOptionCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <NumberInput step={1} label="CardNumber" source="cardNumber" />
        <ReferenceInput
          source="invoice.id"
          reference="Invoice"
          label="Invoices"
        >
          <SelectInput optionText={InvoiceTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
