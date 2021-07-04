import { PrismaService } from "nestjs-prisma";
import {
  Prisma,
  Subscription,
  Customer,
  Invoice,
  PaymentLedger,
} from "@prisma/client";

export class SubscriptionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.SubscriptionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SubscriptionFindManyArgs>
  ): Promise<number> {
    return this.prisma.subscription.count(args);
  }

  async findMany<T extends Prisma.SubscriptionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SubscriptionFindManyArgs>
  ): Promise<Subscription[]> {
    return this.prisma.subscription.findMany(args);
  }
  async findOne<T extends Prisma.SubscriptionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SubscriptionFindUniqueArgs>
  ): Promise<Subscription | null> {
    return this.prisma.subscription.findUnique(args);
  }
  async create<T extends Prisma.SubscriptionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SubscriptionCreateArgs>
  ): Promise<Subscription> {
    return this.prisma.subscription.create<T>(args);
  }
  async update<T extends Prisma.SubscriptionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SubscriptionUpdateArgs>
  ): Promise<Subscription> {
    return this.prisma.subscription.update<T>(args);
  }
  async delete<T extends Prisma.SubscriptionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SubscriptionDeleteArgs>
  ): Promise<Subscription> {
    return this.prisma.subscription.delete(args);
  }

  async getCustomer(parentId: string): Promise<Customer | null> {
    return this.prisma.subscription
      .findUnique({
        where: { id: parentId },
      })
      .customer();
  }

  async getInvoice(parentId: string): Promise<Invoice | null> {
    return this.prisma.subscription
      .findUnique({
        where: { id: parentId },
      })
      .invoice();
  }

  async getPaymentLedger(parentId: string): Promise<PaymentLedger | null> {
    return this.prisma.subscription
      .findUnique({
        where: { id: parentId },
      })
      .paymentLedger();
  }
}
