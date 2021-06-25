import { ArgsType, Field } from "@nestjs/graphql";
import { SubscriptionWhereUniqueInput } from "./SubscriptionWhereUniqueInput";

@ArgsType()
class SubscriptionFindUniqueArgs {
  @Field(() => SubscriptionWhereUniqueInput, { nullable: false })
  where!: SubscriptionWhereUniqueInput;
}

export { SubscriptionFindUniqueArgs };
