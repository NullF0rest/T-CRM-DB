import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { InvoiceTitle } from "../invoice/InvoiceTitle";

export const PaymentOptionEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
