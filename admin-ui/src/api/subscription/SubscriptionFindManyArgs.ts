import { SubscriptionWhereInput } from "./SubscriptionWhereInput";
import { SubscriptionOrderByInput } from "./SubscriptionOrderByInput";

export type SubscriptionFindManyArgs = {
  where?: SubscriptionWhereInput;
  orderBy?: SubscriptionOrderByInput;
  skip?: number;
  take?: number;
};
