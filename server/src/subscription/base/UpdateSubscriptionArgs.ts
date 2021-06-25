import { ArgsType, Field } from "@nestjs/graphql";
import { SubscriptionWhereUniqueInput } from "./SubscriptionWhereUniqueInput";
import { SubscriptionUpdateInput } from "./SubscriptionUpdateInput";

@ArgsType()
class UpdateSubscriptionArgs {
  @Field(() => SubscriptionWhereUniqueInput, { nullable: false })
  where!: SubscriptionWhereUniqueInput;
  @Field(() => SubscriptionUpdateInput, { nullable: false })
  data!: SubscriptionUpdateInput;
}

export { UpdateSubscriptionArgs };
