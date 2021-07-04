import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { CustomerModule } from "./customer/customer.module";
import { SimCardModule } from "./simCard/simCard.module";
import { PackageModule } from "./package/package.module";
import { CustomerSnapshotModule } from "./customerSnapshot/customerSnapshot.module";
import { AddressModule } from "./address/address.module";
import { AddonPackageModule } from "./addonPackage/addonPackage.module";
import { CompanyModule } from "./company/company.module";
import { SimCardSnapshotModule } from "./simCardSnapshot/simCardSnapshot.module";
import { SubscriptionModule } from "./subscription/subscription.module";
import { TransactionModule } from "./transaction/transaction.module";
import { BalanceAccountModule } from "./balanceAccount/balanceAccount.module";
import { PaymentLedgerModule } from "./paymentLedger/paymentLedger.module";
import { PaymentOptionModule } from "./paymentOption/paymentOption.module";
import { InvoiceModule } from "./invoice/invoice.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    UserModule,
    CustomerModule,
    SimCardModule,
    PackageModule,
    CustomerSnapshotModule,
    AddressModule,
    AddonPackageModule,
    CompanyModule,
    SimCardSnapshotModule,
    SubscriptionModule,
    TransactionModule,
    BalanceAccountModule,
    PaymentLedgerModule,
    PaymentOptionModule,
    InvoiceModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
