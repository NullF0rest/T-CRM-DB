import { ArgsType, Field } from "@nestjs/graphql";
import { SubscriptionCreateInput } from "./SubscriptionCreateInput";

@ArgsType()
class CreateSubscriptionArgs {
  @Field(() => SubscriptionCreateInput, { nullable: false })
  data!: SubscriptionCreateInput;
}

export { CreateSubscriptionArgs };
