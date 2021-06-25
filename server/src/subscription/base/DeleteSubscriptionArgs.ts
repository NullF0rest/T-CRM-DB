import { ArgsType, Field } from "@nestjs/graphql";
import { SubscriptionWhereUniqueInput } from "./SubscriptionWhereUniqueInput";

@ArgsType()
class DeleteSubscriptionArgs {
  @Field(() => SubscriptionWhereUniqueInput, { nullable: false })
  where!: SubscriptionWhereUniqueInput;
}

export { DeleteSubscriptionArgs };
