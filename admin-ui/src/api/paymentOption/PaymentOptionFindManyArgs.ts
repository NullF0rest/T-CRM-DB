import { PaymentOptionWhereInput } from "./PaymentOptionWhereInput";
import { PaymentOptionOrderByInput } from "./PaymentOptionOrderByInput";

export type PaymentOptionFindManyArgs = {
  where?: PaymentOptionWhereInput;
  orderBy?: PaymentOptionOrderByInput;
  skip?: number;
  take?: number;
};
