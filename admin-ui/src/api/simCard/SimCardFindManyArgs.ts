import { SimCardWhereInput } from "./SimCardWhereInput";
import { SimCardOrderByInput } from "./SimCardOrderByInput";

export type SimCardFindManyArgs = {
  where?: SimCardWhereInput;
  orderBy?: SimCardOrderByInput;
  skip?: number;
  take?: number;
};
