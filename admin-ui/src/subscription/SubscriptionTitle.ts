import { Subscription as TSubscription } from "../api/subscription/Subscription";

export const SUBSCRIPTION_TITLE_FIELD = "id";

export const SubscriptionTitle = (record: TSubscription) => {
  return record.id;
};
