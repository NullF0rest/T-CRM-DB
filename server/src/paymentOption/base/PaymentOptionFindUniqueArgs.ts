import { ArgsType, Field } from "@nestjs/graphql";
import { PaymentOptionWhereUniqueInput } from "./PaymentOptionWhereUniqueInput";

@ArgsType()
class PaymentOptionFindUniqueArgs {
  @Field(() => PaymentOptionWhereUniqueInput, { nullable: false })
  where!: PaymentOptionWhereUniqueInput;
}

export { PaymentOptionFindUniqueArgs };
