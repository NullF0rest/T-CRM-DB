import { Module } from "@nestjs/common";
import { SubscriptionModuleBase } from "./base/subscription.module.base";
import { SubscriptionService } from "./subscription.service";
import { SubscriptionController } from "./subscription.controller";
import { SubscriptionResolver } from "./subscription.resolver";

@Module({
  imports: [SubscriptionModuleBase],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionResolver],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
