import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import basicHttpAuthProvider from "./auth-provider/ra-auth-basic-http";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { CustomerList } from "./customer/CustomerList";
import { CustomerCreate } from "./customer/CustomerCreate";
import { CustomerEdit } from "./customer/CustomerEdit";
import { CustomerShow } from "./customer/CustomerShow";
import { SimCardList } from "./simCard/SimCardList";
import { SimCardCreate } from "./simCard/SimCardCreate";
import { SimCardEdit } from "./simCard/SimCardEdit";
import { SimCardShow } from "./simCard/SimCardShow";
import { PackageList } from "./package/PackageList";
import { PackageCreate } from "./package/PackageCreate";
import { PackageEdit } from "./package/PackageEdit";
import { PackageShow } from "./package/PackageShow";
import { CustomerSnapshotList } from "./customerSnapshot/CustomerSnapshotList";
import { CustomerSnapshotCreate } from "./customerSnapshot/CustomerSnapshotCreate";
import { CustomerSnapshotEdit } from "./customerSnapshot/CustomerSnapshotEdit";
import { CustomerSnapshotShow } from "./customerSnapshot/CustomerSnapshotShow";
import { AddressList } from "./address/AddressList";
import { AddressCreate } from "./address/AddressCreate";
import { AddressEdit } from "./address/AddressEdit";
import { AddressShow } from "./address/AddressShow";
import { AddonPackageList } from "./addonPackage/AddonPackageList";
import { AddonPackageCreate } from "./addonPackage/AddonPackageCreate";
import { AddonPackageEdit } from "./addonPackage/AddonPackageEdit";
import { AddonPackageShow } from "./addonPackage/AddonPackageShow";
import { CompanyList } from "./company/CompanyList";
import { CompanyCreate } from "./company/CompanyCreate";
import { CompanyEdit } from "./company/CompanyEdit";
import { CompanyShow } from "./company/CompanyShow";
import { SimCardSnapshotList } from "./simCardSnapshot/SimCardSnapshotList";
import { SimCardSnapshotCreate } from "./simCardSnapshot/SimCardSnapshotCreate";
import { SimCardSnapshotEdit } from "./simCardSnapshot/SimCardSnapshotEdit";
import { SimCardSnapshotShow } from "./simCardSnapshot/SimCardSnapshotShow";
import { SubscriptionList } from "./subscription/SubscriptionList";
import { SubscriptionCreate } from "./subscription/SubscriptionCreate";
import { SubscriptionEdit } from "./subscription/SubscriptionEdit";
import { SubscriptionShow } from "./subscription/SubscriptionShow";
import { TransactionList } from "./transaction/TransactionList";
import { TransactionCreate } from "./transaction/TransactionCreate";
import { TransactionEdit } from "./transaction/TransactionEdit";
import { TransactionShow } from "./transaction/TransactionShow";
import { BalanceAccountList } from "./balanceAccount/BalanceAccountList";
import { BalanceAccountCreate } from "./balanceAccount/BalanceAccountCreate";
import { BalanceAccountEdit } from "./balanceAccount/BalanceAccountEdit";
import { BalanceAccountShow } from "./balanceAccount/BalanceAccountShow";
import { PaymentLedgerList } from "./paymentLedger/PaymentLedgerList";
import { PaymentLedgerCreate } from "./paymentLedger/PaymentLedgerCreate";
import { PaymentLedgerEdit } from "./paymentLedger/PaymentLedgerEdit";
import { PaymentLedgerShow } from "./paymentLedger/PaymentLedgerShow";
import { PaymentOptionList } from "./paymentOption/PaymentOptionList";
import { PaymentOptionCreate } from "./paymentOption/PaymentOptionCreate";
import { PaymentOptionEdit } from "./paymentOption/PaymentOptionEdit";
import { PaymentOptionShow } from "./paymentOption/PaymentOptionShow";
import { InvoiceList } from "./invoice/InvoiceList";
import { InvoiceCreate } from "./invoice/InvoiceCreate";
import { InvoiceEdit } from "./invoice/InvoiceEdit";
import { InvoiceShow } from "./invoice/InvoiceShow";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"TeleCRM"}
        dataProvider={dataProvider}
        authProvider={basicHttpAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
        <Resource
          name="Customer"
          list={CustomerList}
          edit={CustomerEdit}
          create={CustomerCreate}
          show={CustomerShow}
        />
        <Resource
          name="SimCard"
          list={SimCardList}
          edit={SimCardEdit}
          create={SimCardCreate}
          show={SimCardShow}
        />
        <Resource
          name="Package"
          list={PackageList}
          edit={PackageEdit}
          create={PackageCreate}
          show={PackageShow}
        />
        <Resource
          name="CustomerSnapshot"
          list={CustomerSnapshotList}
          edit={CustomerSnapshotEdit}
          create={CustomerSnapshotCreate}
          show={CustomerSnapshotShow}
        />
        <Resource
          name="Address"
          list={AddressList}
          edit={AddressEdit}
          create={AddressCreate}
          show={AddressShow}
        />
        <Resource
          name="AddonPackage"
          list={AddonPackageList}
          edit={AddonPackageEdit}
          create={AddonPackageCreate}
          show={AddonPackageShow}
        />
        <Resource
          name="Company"
          list={CompanyList}
          edit={CompanyEdit}
          create={CompanyCreate}
          show={CompanyShow}
        />
        <Resource
          name="SimCardSnapshot"
          list={SimCardSnapshotList}
          edit={SimCardSnapshotEdit}
          create={SimCardSnapshotCreate}
          show={SimCardSnapshotShow}
        />
        <Resource
          name="Subscription"
          list={SubscriptionList}
          edit={SubscriptionEdit}
          create={SubscriptionCreate}
          show={SubscriptionShow}
        />
        <Resource
          name="Transaction"
          list={TransactionList}
          edit={TransactionEdit}
          create={TransactionCreate}
          show={TransactionShow}
        />
        <Resource
          name="BalanceAccount"
          list={BalanceAccountList}
          edit={BalanceAccountEdit}
          create={BalanceAccountCreate}
          show={BalanceAccountShow}
        />
        <Resource
          name="PaymentLedger"
          list={PaymentLedgerList}
          edit={PaymentLedgerEdit}
          create={PaymentLedgerCreate}
          show={PaymentLedgerShow}
        />
        <Resource
          name="PaymentOption"
          list={PaymentOptionList}
          edit={PaymentOptionEdit}
          create={PaymentOptionCreate}
          show={PaymentOptionShow}
        />
        <Resource
          name="Invoice"
          list={InvoiceList}
          edit={InvoiceEdit}
          create={InvoiceCreate}
          show={InvoiceShow}
        />
      </Admin>
    </div>
  );
};

export default App;
